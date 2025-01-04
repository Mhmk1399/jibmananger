import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    AccountBalance: {
        type: Number,
        required: false,
    },
    cardNumber: {
        type: String,
        required: false,
    },
    cvv2: {
        type: String,
        required: false,
    },
    expiryDate: {
        type: String,
        required: false,
    },
    shabaNumber: {
        type: String,
        required: false,
    }  },{timestamps: true});


    export const bank = mongoose.models.bank || mongoose.model("bank", bankSchema);