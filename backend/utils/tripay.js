const crypto = require('crypto');
const axios = require('axios');
class Tripay {
    constructor(APIKEY, MERCHANTCODE, MERCHANTREF, PRIVATEKEY) {
        this.APIKEY = APIKEY;
        this.MERCHANT_CODE = MERCHANTCODE;
        this.MERCHANT_REF = MERCHANTREF;
        this.PRIVATEKEY = PRIVATEKEY;
        this.APIURL = "https://tripay.co.id/api-sandbox"
    }
    getTransaction(transactionId) {
        return new Promise((resolve, reject) => {
            axios.get(this.APIURL + `/transaction/detail?reference=${transactionId}`, {
                headers: {
                    "content-type": 'application/json',
                    "accept": 'application/json',
                    'Authorization': 'Bearer ' + this.APIKEY
                },
                validateStatus: function (status) {
                    return status < 999
                }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
    createTransaction(paymentType, amount, email, name) {
        return new Promise((resolve, reject) => {
            const dateNow = new Date();
            const expiry = parseInt(Math.floor(dateNow/1000) + (24*60*60)); // 24 jam (24 = jam, 60 = minutes, 60 = seconds)
            const signature = crypto.createHmac('sha256', this.PRIVATEKEY)
                .update(this.MERCHANT_CODE + this.MERCHANT_REF + amount)
                .digest('hex');
            const payload = JSON.stringify({
                'method': paymentType,
                'merchant_ref': this.MERCHANT_REF,
                'amount': amount,
                'customer_name': name,
                'customer_email': email,
                'order_items': [
                    {
                        'sku': 'Topup Saldo',
                        'name': `Topup Saldo ${amount}`,
                        'price': amount,
                        'quantity': 1,
                        'product_url': 'https://yuelhost.com',
                        'image_url': 'https://yuelhost.com'
                    },
                ],
                'return_url': 'https://yuelhost.com',
                'expired_time': expiry,
                'signature': signature
            })
            axios.post(this.APIURL + "/transaction/create", payload, {
                headers: {
                    "content-type": 'application/json',
                    "accept": 'application/json',
                    'Authorization': 'Bearer ' + this.APIKEY
                },
                validateStatus: function (status) {
                    return status < 999
                }
            }).then(async ({ data }) => {
                try {
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = Tripay