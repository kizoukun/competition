const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fake = {
    email: "admin@admin.com",
    password: "admin"
}

router.use((req, res, next) => {
    next();
})
router.post("/login", (req, res) => {
    if(req.isAuthenticated()) {
        return res.json({success: false, message: "You are already logged in!"});
    }
    const user = req.body;
    if(user.email !== fake.email || user.password !== fake.password) {
        return res.json({success: false, message: "Login failed! wrong email or password"});
    }
    const token = jwt.sign({email: user.email}, process.env.SECRET_KEY, {expiresIn: '60s'});
    return res.json({success: true, message: "Login successful!", token: token});
});

router.post("/register", async (req, res) => {

})

router.delete("/logout", (req, res) => {
    return res.json({success: true, message: "Logout successful!"});
});

module.exports = router;