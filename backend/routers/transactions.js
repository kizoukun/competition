const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const Users = require('../models/Users');
const Transactions = require('../models/Transactions');
const Tripay = require('../utils/tripay');
const tripayPayment = new Tripay(process.env.TRIPAY_API_KEY, process.env.TRIPAY_KODE_MERCHANT, process.env.TRIPAY_NAMA_MERCHANT, process.env.TRIPAY_PRIVATE_KEY);

router.post("/create", async (req, res) => {
    const { paymentType, amount } = req.body;
    const user = await Users.findById(req.user.id);
    tripayPayment.createTransaction(paymentType, amount, user.email, user.firstName + " " + user.lastName)
        .then((response) => {
            if(response.success) {
                const transaction = new Transactions({
                    userId: user._id,
                    amount: amount,
                    status: "UNPAID",
                    expiredTime: response.data.expired_time * 1000,
                    qrImage: response?.data?.qr_url || null,
                    paymentId: response.data.reference,
                    paymentType: paymentType,
                    paymentName: response.data.payment_name,
                    paymentData: response.data
                })
                transaction.save();
                return res.json({success: true, message: "Transaction created", data: {
                    id: transaction._id
                }})
            } else {
                return res.json({success: false, message: response.message});
            }
        })
        .catch((err) => {
            return res.json({success: false, message: "Failed to create transaction", error: err});
        });
});

router.get("/:id", async (req, res) => {
    if(!isValidObjectId(req.params.id)) {
        return res.json({success: false, message: "Transaction not found"});
    }
    const transaction = await Transactions.findById(req.params.id);
    if(!transaction) {
        return res.json({success: false, message: "Transaction not found"});
    }
    if(req.user.id !== transaction.userId) {
        return res.json({success: false, message: "Transaction not found"});
    }
    return res.json({success: true, message: "Transaction found", data: {
        id: transaction._id,
        amount: transaction.amount,
        status: transaction.status,
        expiredTime: transaction.expiredTime,
        qrImage: transaction.qrImage,
        paymentId: transaction.paymentId,
        paymentType: transaction.paymentType,
        paymentName: transaction.paymentName,
    }});
})

router.patch("/:id", async (req, res) => {
    if(!isValidObjectId(req.params.id)) {
        return res.json({success: false, message: "Transaction not found"});
    }
    const transaction = await Transactions.findById(req.params.id);
    Transactions.handleTransaction(transaction, req.body.status)
        .then(() => {
            return res.json({success: true, message: "Transaction updated"});
        })
        .catch((err) => {
            if(err.status === 202) {
                return res.json({success: false, message: err.message});
            } else {
                return res.json({success: false, message: "Failed to update transaction"});
            }
        });
})

module.exports = router;