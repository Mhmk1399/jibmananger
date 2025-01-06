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
      amount: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: false
      },
      date: {
        type: Date,
        default: Date.now
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      type: {
        type: String,
        enum: ['income', 'outcome'],
        required: true
      }
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }]
  },
  { timestamps: true }
);

export const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);
