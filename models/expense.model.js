import mongoose, { Schema } from "mongoose";

// Expense Schema
const expenseSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        default: 'debit'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Expense Model
const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;