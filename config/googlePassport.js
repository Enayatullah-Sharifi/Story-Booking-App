const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../server/model/User')


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIEN_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async(accessToken, refreshToken, profile, done) => {
        console.log('Hello')
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}