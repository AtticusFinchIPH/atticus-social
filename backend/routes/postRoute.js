import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { isAuth } from "../auth/authHelper";
import Post from "../models/postModel";
import User from "../models/userModel";

const router = express.Router();

router.get("/own", isAuth, async (req, res) => {
    const user = req.user;
    const posts = await Post.find({postedBy: user._id})
                            .sort('-created');
    res.status(200).send(posts);
});

router.get("/newsfeed", isAuth, async (req, res) => {
    const user = req.user;
    let followings = await User.findById(user._id).followings;
    try{
      let posts = await Post.find({postedBy: { $in : followings } })
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
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
                    fs.readFileSync(files.photo.path, (err) => {
                        if (err) throw ERR_HANDLE_IMAGE;
                    });
                    post.photo = files.photo.path;
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
                return res.status(500).json({ msg: ERR_IMAGE_UPLOAD});
            case ERR_HANDLE_IMAGE:
                return res.status(500).json({ msg: ERR_HANDLE_IMAGE});
            case ERR_IMAGE_TYPE:
                return res.status(500).json({ msg: ERR_IMAGE_TYPE});
            default:
                return res.status(500).json({ msg: ERR_IMAGE_UNKNOWN})
        }
    }
});

router.get("/photo/", (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
});

export default router;