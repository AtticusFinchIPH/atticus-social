import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    nickName: { type: String, required: true},
    description: {type: String},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false},

    about: { type: String},
    photo: { type: String}, 
    followings: [{
        _id: {type: mongoose.Schema.ObjectId, ref: 'User'},
        chatId: {type: mongoose.Schema.ObjectId, ref: 'Chat'},
    }],
    followers: [{
        _id: {type: mongoose.Schema.ObjectId, ref: 'User'},
        chatId: {type: mongoose.Schema.ObjectId, ref: 'Chat'},
    }],
    favoritePosts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}],
    chats: [{type: mongoose.Schema.ObjectId, ref: 'Chat'}],
})

const userModel = mongoose.model("User", userSchema);

export default userModel;