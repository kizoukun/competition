const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Tokens = require('../models/Tokens');
const bcrypt = require('bcrypt');

router.post("/login", async(req, res) => {
    if(!validForm(req.body, ["email", "password"])) {
        return res.json({success: false, message: "All fields are required!"});
    }
    const body = req.body;
    const user = await Users.findOne({email: body.email});
    if(!user) {
        return res.json({success: false, message: "Login failed! wrong email or password"});
    }
    if(!bcrypt.compareSync(body.password, user.password)) {
        return res.json({success: false, message: "Login failed! wrong email or password"});
    }
    const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1h'});
    try {
        await (new Tokens({
            token: token,
            userId: user._id,
        }).save())
    } catch (err) {
        return res.json({success: false, message: "Unexpected error!"});
    }
    return res.json({success: true, message: "Login successful!", token: token});
});

router.post("/register", async (req, res) => {
    const body = req.body;
    if(!validForm(body, ["email", "password", "passwordConfirmation", "firstName", "lastName", "phoneNumber"])) {
        return res.json({success: false, message: "All fields are required!"});
    }
    if(body.password !== body.passwordConfirmation) {
        return res.json({success: false, message: "Password and confirm password must match!"});
    }

    const checkUser = await Users.findOne({email: body.email});
    if(checkUser) {
        return res.json({success: false, message: "Email already exists!"});
    }

    const user = new Users({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber
    });
    try {
        await user.save()
    } catch (err) {
        return res.json({success: false, message: "Register failed!", error: err.message});
    }
    return res.json({success: true, message: "Register successful!"});
})

router.delete("/logout", async (req, res) => {
    const splitToken = req.headers['authorization'].split(' ')[1];
    const token = await Tokens.findOneAndDelete({token: splitToken});
    return res.json({success: true, message: "Logout successful!"});
});

function validForm(body, forms) {
    for(let i = 0; i < forms.length; i++) {
        if(body[forms[i]] == null || body[forms[i]] === "" || body[forms[i]] === undefined) {
            return false;
        }
    }
    return true;
}

module.exports = router;