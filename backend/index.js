require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const mongoose = require('./utils/mongodb');
const allowedOrigins = ['http://localhost:5173',
                      'localhost:3000'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const initializePassportJwt = require('./utils/passportJwt');
initializePassportJwt(passport);
app.use(passport.initialize());

const authRouter = require('./routers/auth');
app.use("/api/v1/auth", authRouter);


const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json({success: false, message: "You are not logged in!"});
        }
        req.user = user;
        return next();
    })(req, res, next);
}

app.use("/api/v1", requireAuth);

const usersRouter = require('./routers/users');
const transactionsRouter = require('./routers/transactions');
const transportationsRotuer = require('./routers/transportations');
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/transportations", transportationsRotuer);

app.get("/api/v1/test", passport.authenticate('jwt', { session: false }),  (req, res) => {
    res.json({success: true, message: "Hello World!"});
});


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});