import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    text: { type: String },
    photo: {
        data: { type: Buffer,  default: null },
        contentType: { type: String,  default: null },
    },
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
    }],
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    created: { type: Date, required: true, default: Date.now },
})

const postModel = mongoose.model("Post", postSchema);

export default postModel;