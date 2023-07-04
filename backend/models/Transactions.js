const mongoose = require('mongoose');
const BalanceHistory = require('./BalanceHistory');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['UNPAID', 'PAID', 'EXPIRED', 'CANCELLED'],
        uppercase: true,
    },
    expiredTime: {
        type: Date,
        required: true,
    },
    qrImage: {
        type: String,
        required: false,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    paymentName: {
        type: String,
        required: true,
    },
    paymentData: {
        type: Object,
        required: false,
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

transactionSchema.static({
    async handleTransaction(transaction, status) {
        const enumValues = this.schema.path('status').enumValues;
        const expectedError = new Error("");
        expectedError.status = 202;
        if(!enumValues.includes(status.toUpperCase())) {
            expectedError.message = "Invalid Status";
            throw expectedError;
        }
        if(transaction.status === "PAID") {
            expectedError.message = "Transaction already paid";
            throw expectedError;
        }
        if (status === "PAID") {
            await BalanceHistory.addUserBalance(transaction.userId, transaction.amount, `Top up from ${transaction.paymentName} ${transaction.paymentType}`);
        }
        transaction.status = status.toUpperCase();
        transaction.updatedAt = Date.now();
        await transaction.save();
    }
})



module.exports = mongoose.model('transactions', transactionSchema);