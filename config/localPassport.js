const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const User = require('../server/model/User')
const { loginValidation } = require('../utils/validation')


module.exports = function(passport) {
    passport.use(new localStrategy({ usernameField: 'email'}, (email, password, done) => {
        const { valid, errors } = loginValidation(email, password)
        if(!valid) {
            return res.send(errors)
        }
        
         User.findOne({ email }) 
         .then(user => {
             if(!user) {
                 return done(null, false, 'No user with this email found')
             }

             bcrypt.compare(password, user.password, (err, isMatch) => {
                 if(err) throw err
                 
                 if(isMatch) {
                     return done(null, user)
                 } else {
                     return done(null, false, 'Incorrect credential')
                 }
             })
         })  
         .catch(err => {
            console.log(err)
         })

    }))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => {
        done(err, user)
    }))
    
}