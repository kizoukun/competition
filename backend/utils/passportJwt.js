const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};
function initializePassportJwt(passport) {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        return done(null, jwt_payload);
    }));
}

module.exports = initializePassportJwt;