import express from "express";
import {getToken, isAuth} from "../auth/authHelper";
import User from "../models/userModel";
import Post from "../models/postModel";

const router = express.Router();

router.post("/signin", async (req, res) => {
    console.log(req.body.email, req.body.password)
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    }).populate([
        {
            path: 'favoritePosts',
            model: 'Post',
            select: 'text photo likes created',
            populate: {
                path: 'postedBy',
                model: 'User',
                select: 'nickName photo',
            }
        }
    ]);
    console.log(signinUser)
    if(signinUser){
        res.send({
            _id: signinUser._id,
            firstName: signinUser.firstName,
            lastName: signinUser.lastName,
            nickName: signinUser.nickName,
            description: signinUser.description,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
            favoritePosts: signinUser.favoritePosts,
        })
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})

router.post("/register", async (req, res) => {
    const registerUser = await User.findOne({
        email: req.body.email,
    });
    if(registerUser) res.status(401).send({ msg: 'Email has been used by another user'});
    else {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
        });
        const newUser = await user.save();
        if (newUser) {
            res.send({
                _id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                nickName: newUser.nickName,
                description: newUser.description,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser),
                favoritePosts: newUser.favoritePosts,
            });
        } else {
            res.status(401).send({ message: 'Invalid User Data' });
        }
    }
})

router.get("/", isAuth, async (req, res) => {
    const users = await User.find({}).populate('favoritePosts');
    return res.status(200).send(users);
})

router.get("/following", isAuth, async (req, res) => {
    const user = req.user;
    const userInfo = await User.findById(user._id)
                            .populate('followings', '_id firstName lastName nickName');
    const { followings } = userInfo;
    return res.status(200).send(followings);
})

router.get("/notfollowing", isAuth, async (req, res) => {
    const user = req.user;
    const users = await User.find({ $and: [{_id: {$ne: user._id}}, {followers: {$ne: user._id}}] });
    return res.status(200).send(users);
})

router.get("/profile/:userId", isAuth, async (req, res) => {
    const userId = req.params.userId;
    console.log(`GET /users/profile/${userId}`);
    const user = await User.findById(userId);
    const posts = await Post.find({postedBy: user._id})
                            .populate([
                                {
                                    path: 'favoritePosts',
                                    model: 'Post',
                                    select: 'text photo likes created',
                                    populate: {
                                        path: 'postedBy',
                                        model: 'User',
                                        select: 'nickName photo',
                                    }
                                }
                            ])
                            .populate('comments.postedBy', '_id firstName lastName nickName')
                            .populate('postedBy', '_id firstName lastName nickName')
                            .sort('-created')
                            .exec();
    const profile = {user, posts};
    return res.status(200).send(profile);
})

router.put("", isAuth, async (req, res) => {
    const user = req.user;
    const { nickName, description } = req.body;
    try {
        const userInfo = await User.findByIdAndUpdate(user._id, {nickName, description}, {new: true})
                                    .populate([
                                        {
                                            path: 'favoritePosts',
                                            model: 'Post',
                                            select: 'text photo likes created',
                                            populate: {
                                                path: 'postedBy',
                                                model: 'User',
                                                select: 'nickName photo',
                                            }
                                        }
                                    ]);
        if(userInfo){
            res.send({
                _id: userInfo._id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                nickName: userInfo.nickName,
                description: userInfo.description,
                email: userInfo.email,
                isAdmin: userInfo.isAdmin,
                token: getToken(userInfo),
                favoritePosts: userInfo.favoritePosts,
            })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error in Updating cover profile"});       
    }
})

router.put("/follow", isAuth, async (req, res) => {
    const user = req.user;
    const { followingId } = req.body;
    try {
        if(!followingId || !followingId.match(/^[0-9a-fA-F]{24}$/)) throw "Following ID not defined";
        const userInfo = await User.findByIdAndUpdate(user._id, {$push: {followings: followingId}}, {new: true})
                                    .populate('followings', '_id firstName lastName nickName');
        const following = await User.findByIdAndUpdate(followingId, {$push: {followers: user._id}});
        const { followings } = userInfo;
        return res.status(200).send(followings);
    } catch (error) {
        return res.status(500).json({ msg: "Error in Following action"});
    }
})

router.put("/unfollow", isAuth, async (req, res) => {
    console.log(true)
    const user = req.user;
    const { unfollowingId } = req.body;
    try {
        if(!unfollowingId || !unfollowingId.match(/^[0-9a-fA-F]{24}$/)) throw "UnFollowing ID not defined";
        const userInfo = await User.findByIdAndUpdate(user._id, {$pull: {followings: unfollowingId}}, {new: true})
                                    .populate('followings', '_id firstName lastName nickName');
        const unfollowing = await User.findByIdAndUpdate(unfollowingId, {$pull: {followers: user._id}});
        const { followings } = userInfo;
        return res.status(200).send(followings);
    } catch (error) {
        return res.status(500).json({ msg: "Error in UnFollowing action"});
    }
})
export default router;