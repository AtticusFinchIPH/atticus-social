import express from "express";
import {getToken, isAuth} from "../auth/authHelper";
import User from "../models/userModel";

const router = express.Router();

router.post("/signin", async (req, res) => {
    console.log(req.body.email, req.body.password)
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser._id,
            firstName: signinUser.firstName,
            lastName: signinUser.lastName,
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
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser),
                favoritePosts: signinUser.favoritePosts,
            });
        } else {
            res.status(401).send({ message: 'Invalid User Data' });
        }
    }
})

router.get("/", isAuth, async (req, res) => {
    const users = await User.find({});
    return res.status(200).send(users);
})

router.get("/following", isAuth, async (req, res) => {
    const user = req.user;
    const userInfo = await User.findById(user._id)
                            .populate('followings', '_id firstName lastName');
    const { followings } = userInfo;
    return res.status(200).send(followings);
})

router.get("/notfollowing", isAuth, async (req, res) => {
    const user = req.user;
    const users = await User.find({ $and: [{_id: {$ne: user._id}}, {followers: {$ne: user._id}}] });
    return res.status(200).send(users);
})

export default router;