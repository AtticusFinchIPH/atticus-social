import express from "express";
import {getToken} from "../auth/authHelper";
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


export default router;