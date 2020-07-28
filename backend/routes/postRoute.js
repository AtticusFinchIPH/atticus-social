import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import { isAuth } from "../auth/authHelper";
import Post from "../models/postModel";

const router = express.Router();

router.get("/own", isAuth, async (req, res) => {
    const user = req.user;
    const posts = await Post.find({postedBy: user._id});
    res.status(200).send(posts);
});

router.post("/", isAuth, async (req, res) => {
    const user = req.user;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ msg: "Image could not be uploaded" });
        }
        console.log(fields);
        let post = new Post(fields);
        post.postedBy= user._id;
        console.log(files.photo)
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        } else {
            post.photo = null;
        }
        try {
            let result = await post.save();
            console.log(result);
            if(result) return res.status(200).send(result);
        }catch (err){
        return res.status(500).json({ msg: 'Error in Creating New Post'})
        }
    })
});

router.get("/photo/", (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
});

export default router;