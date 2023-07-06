const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Users = require('../models/Users');
const BalanceHistory = require('../models/BalanceHistory');

router.get("/", async (req, res) => {
    const user = await Users.findById(req.user.id);
    if(!user) {
        return res.json({success: false, message: "You are not logged in!"});
    }
    const emailMd5 = crypto.createHash("md5").update(user.email).digest("hex");
    return res.json({success: true, message: "You are authenticated!", data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            image: emailMd5
        }});
});

router.get("/balance", async (req, res) => {
    const balance = await BalanceHistory.findOne({userId: req.user.id}).sort({createdAt: -1}).limit(1);
    return res.json({success: true, message: "Getting balance", data: {
        balance: balance.balanceAfter,
    }});
});

module.exports = router;