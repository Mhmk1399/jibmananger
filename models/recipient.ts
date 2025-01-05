import mongoose from 'mongoose';

const resipientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});

export const recipient = mongoose.models.recipient || mongoose.model("recipient", resipientSchema);