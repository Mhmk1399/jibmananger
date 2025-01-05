import mongoose from 'mongoose';

const budgetItemSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: false
    }
}, { timestamps: true });

export const BudgetItem = mongoose.models.BudgetItem || mongoose.model('BudgetItem', budgetItemSchema);
