import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    budget: {
      type: Number,
      required: true,
      default: 0,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }]
  },
  { timestamps: true }
);

export const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);
