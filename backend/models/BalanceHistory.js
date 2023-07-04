const mongoose = require('mongoose');

const BalanceHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    balanceBefore: {
        type: Number,
        required: true,
    },
    balanceAfter: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = mongoose.model('balance_histories', BalanceHistorySchema);