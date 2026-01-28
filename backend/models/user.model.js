import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: null,
    },
    // lastLogin: {
    //     type: Date,
    //     default: Date.now
    // },
    // isverified: {
    //     type: Boolean,
    //     default: false
    // },
    // resetPasswordToken: String,
    // resetPasswordExpiresAt: Date,
    // verificationToken: String,
    // verificationTokenExpiresAt: Date,
}, {timestamps: true});

export default mongoose.model('User', userSchema)