const mongoose = require('mongoose');
const Users = require('./Users');

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

BalanceHistorySchema.static({
  async getLatestBalance(userId) {
      return await this.findOne({userId: userId}).sort({createdAt: -1}).limit(1);
  },
  async addUserBalance(userId, amount, description) {
      const userBalance = await this.getLatestBalance(userId);
      const balance = userBalance ? userBalance.balanceAfter : 0;
      let userEmail = userBalance?.email;
      if(!userEmail) {
        const user = await Users.findById(userId);
        userEmail = user.email;
      }
      const newBalance = balance + amount;
      const balanceHistory = new this({
        userId: userId,
        userEmail: userEmail,
        balanceBefore: balance,
        balanceAfter: newBalance,
        amount: amount,
        type: 1,
        description: description,
      });
      await balanceHistory.save();
  }
})

module.exports = mongoose.model('balance_histories', BalanceHistorySchema);