import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false},
})

const userModel = mongoose.model("User", userSchema);

export default userModel;