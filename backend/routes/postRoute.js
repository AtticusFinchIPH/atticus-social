import express from "express";
import { isAuth } from "../auth/authHelper";
import cloudinaryConfig from '../cloudinaryConfig';
import Post from "../models/postModel";
import User from "../models/userModel";

const router = express.Router();

router.get("/favorites", isAuth, async(req, res) => {
    const user = req.user;
    try {
        let userInfo = await User.findById(user._id)
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
                                .sort('-created')
                                .exec();
        const {favoritePosts} = userInfo;
        return res.status(200).json(favoritePosts);
    } catch (error) {
        return res.status(500).json({ msg: "Error in making favorite post"});
    }
});

router.get("/own", isAuth, async (req, res) => {
    const user = req.user;
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
    res.status(200).send(posts);
});

router.get("/newsfeed", isAuth, async (req, res) => {
    const user = req.user;
    const currentUser = await User.findById(user._id);
    const { followings } = currentUser;
    const followingIDs = followings.map(person => person._id);
    try{
      let posts = await Post.find({postedBy: { $in : followingIDs } })
                            .populate('comments.postedBy', '_id firstName lastName nickName')
                            .populate('postedBy', '_id firstName lastName nickName')
                            .sort('-created')
                            .exec();
      res.status(200).json(posts);
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
});

const ERR_IMAGE_UPLOAD = "Image could not be uploaded";
const ERR_HANDLE_IMAGE = "Error in Handling image";
const ERR_IMAGE_TYPE = "Image type not supported";
const ERR_IMAGE_UNKNOWN = 'Error in Creating New Post';
router.post("/", isAuth, cloudinaryConfig.parser.single('photo'), async (req, res) => {
    const user = req.user;
    console.log(req.file)
    console.log(req.body)
    try {
        if(req.body.photo !== 'null' && !req.file?.path) throw ERR_IMAGE_UPLOAD
        else {
            let post = new Post();
            post.text = req.body.text;
            post.photo = req.file?.path || null;
            post.postedBy = user._id;
            let result = await (await post.save()).populate('postedBy', '_id firstName lastName nickName').execPopulate();
            if(result) return res.status(200).send(result);
            else throw ERR_IMAGE_UNKNOWN;
        }
    } catch (error) {
        switch(error){
            case ERR_IMAGE_UPLOAD:
                return res.status(400).json({ msg: ERR_IMAGE_UPLOAD});
            case ERR_HANDLE_IMAGE:
                return res.status(400).json({ msg: ERR_HANDLE_IMAGE});
            case ERR_IMAGE_TYPE:
                return res.status(400).json({ msg: ERR_IMAGE_TYPE});
            default:
                return res.status(500).json({ msg: ERR_IMAGE_UNKNOWN});
        }
    }
});

const REACT_TYPE_LIKE = "REACT_TYPE_LIKE";
const REACT_TYPE_COMMENT = "REACT_TYPE_COMMENT";
const ERR_REACT_TYPE_UNKNOWN = "React type unknown";
router.put("/react", isAuth, async (req, res) => {
    const user = req.user;
    let post = {};
    try {
        const {actionType, actionValue, postId} = req.body;
        switch (actionType){
            case REACT_TYPE_LIKE:
                actionValue 
                ? post = await Post.findByIdAndUpdate(postId, {$push: {likes: user._id}}, {new: true}) 
                : post = await Post.findByIdAndUpdate(postId, {$pull: {likes: user._id}}, {new: true});
                break;
            case REACT_TYPE_COMMENT:
                const newComment = {
                    text: actionValue,
                    postedBy: user._id,
                }
                post = await Post.findByIdAndUpdate(postId, {$push: {comments: newComment}}, {new: true})
                                    .populate('comments.postedBy', '_id firstName lastName nickName')
                                    .populate('postedBy', '_id firstName lastName nickName')
                                    .exec();
                break;
            default: throw ERR_REACT_TYPE_UNKNOWN;
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ msg: "Server Error. Cannot taking action."});
    }
});

router.put("/favorite", isAuth, async(req, res) => {
    const user = req.user;
    try {
        const {favoriteValue, postId} = req.body;
        let userInfo = {};
        favoriteValue 
        ? userInfo = await User.findByIdAndUpdate(user._id, {$push: {favoritePosts: postId}}, {new: true})
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
                                .sort('-created')
                                .exec()
        : userInfo = await User.findByIdAndUpdate(user._id, {$pull: {favoritePosts: postId}}, {new: true})
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
                                .sort('-created')
                                .exec();
        const {favoritePosts} = userInfo;
        return res.status(200).json(favoritePosts);
    } catch (error) {
        return res.status(500).json({ msg: "Error in making favorite post"});
    }
});

router.delete("/:postId", isAuth, async(req, res) => {
    const postId = req.params.postId;
    console.log(`Post ID: ${postId} is being deleted.`)
    try {
        const deletedPost = await Post.findByIdAndDelete(postId, (err, docs) => { if (err) throw err; });
        return res.status(200).json(deletedPost);
    } catch (error) {
        return res.status(500).json({ msg: error});
    }
});

export default router;