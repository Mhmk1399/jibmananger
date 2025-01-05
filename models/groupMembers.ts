import mongoose from 'mongoose';

const groupMemberSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'member'],
        default: 'member',
        required: true
    }
}, { timestamps: true });

export const GroupMember = mongoose.models.GroupMember || mongoose.model('GroupMember', groupMemberSchema);
