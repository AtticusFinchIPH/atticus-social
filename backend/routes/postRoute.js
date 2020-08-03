import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { isAuth } from "../auth/authHelper";
import Post from "../models/postModel";
import User from "../models/userModel";

const router = express.Router();

router.get("/photo", (req, res) => {
    try {
        const data = fs.readFileSync(req.post.photo.path, (err) => {
            if (err) throw ERR_HANDLE_IMAGE;
        });
        console.log(req.post.photo.data);
        res.set("Content-Type", req.post.photo.contentType)
        return res.send(data)
    } catch (error) {
        switch(error){
            case ERR_HANDLE_IMAGE:
                return res.status(400).json({ msg: ERR_HANDLE_IMAGE});
            default:
                return res.status(500).json({ msg: "Error in Getting Post"});
        }
    }   
});

router.get("/favorite", isAuth, async (req, res) => {
    const user = req.user;
    const posts = await User.findById( user._id)
                            .sort('-created');
    res.status(200).send(posts);
});

router.get("/own", isAuth, async (req, res) => { 
    const user = req.user;
    const posts = await Post.find({postedBy: user._id})
                            .populate('favoritePosts')
                            .sort('-created')
                            .exec();                       
    return res.status(200).send(posts);
});

router.get("/newsfeed", isAuth, async (req, res) => {
    const user = req.user;
    let followings = await User.findById(user._id).followings;
    try{
      let posts = await Post.find({postedBy: { $in : followings } })
                            .populate('comments.postedBy', '_id firstName lastName')
                            .populate('postedBy', '_id firstName lastName')
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
router.post("/", isAuth, async (req, res) => {
    const user = req.user;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname + '/../uploads');
    try {
        form.parse(req, async (err, fields, files) => {
            if (err) throw ERR_IMAGE_UPLOAD;
            let post = new Post(fields);
            post.postedBy= user._id;
            if(files.photo){
                // let tmpPath = files.photo.path;
                // let newPath = form.uploadDir + files.photo.name;
                // fs.renameSync(tmpPath, newPath, (err) => {
                //     if (err) throw ERR_HANDLE_IMAGE;
                // });
                switch (files.photo.type) {
                case "image/jpeg":
                case "image/png":
                    const data = fs.readFileSync(files.photo.path, (err) => {
                        if (err) throw ERR_HANDLE_IMAGE;
                    });
                    post.photo.data = data;
                    post.photo.contentType = files.photo.type;
                    break;
                default:
                    throw ERR_IMAGE_TYPE;
                }
            } else {
                post.photo = null;
            }       
            let result = await post.save();
            console.log(result);
            if(result) return res.status(200).send(result);
        });   
    }catch (err){
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
                post = await Post.findByIdAndUpdate(postId, {$push: {comments: actionValue}}, {new: true})
                                    .populate('comments.postedBy', '_id name')
                                    .populate('postedBy', '_id name')
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
                                .populate('favoritePosts')
                                .sort('-created')
                                .exec()
        : userInfo = await User.findByIdAndUpdate(user._id, {$pull: {favoritePosts: postId}}, {new: true})
                                .populate('favoritePosts')
                                .sort('-created')
                                .exec();
        const {favoritePosts} = userInfo;
        return res.status(200).json(favoritePosts);
    } catch (error) {
        return res.status(500).json({ msg: "Error in making favorite post"});
    }
});

export default router;