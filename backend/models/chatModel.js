import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    isPrivate: { type: Boolean, required: true},
    participants: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    messages: [{
        nickName: { type: String, required: true },
        text: { type: String },
        time: { type: Date, required: true },
    }]
})

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;