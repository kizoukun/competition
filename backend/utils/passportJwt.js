const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    passReqToCallback: true
};
const Tokens = require('../models/Tokens');

function initializePassportJwt(passport) {
    passport.use(new JwtStrategy(opts, async (req, payload, done) => {
        const splitToken = req.headers['authorization'].split(' ')[1];
        const token = await Tokens.findOne({token: splitToken});
        if(!token) {
            return done(null, false);
        }
        return done(null, payload);
    }));
}

module.exports = initializePassportJwt;