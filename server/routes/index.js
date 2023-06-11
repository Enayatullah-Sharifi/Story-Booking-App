const express = require('express');
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const { registerValidation } = require('../../utils/validation');
const User = require('../model/User')
const mongoose = require('mongoose')
const { ensureGuest, ensureAuth } = require('../../utils/checkAuth');
const Story = require('../model/Story');
const { formatDate, editIcon, deleteIcon } = require('../../utils/helper')


// @desc    Resister/Landing page
// @route   GET /
router.get('/register', ensureGuest, (req, res) => {
    res.render('register')
})

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})


// @desc    Dashboard
// @route   GET/dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    const user = req.user;
    const stories = await Story.find({status: 'public'}).populate('user').sort({ createdAt: 'desc'})
    res.render('dashboard', { user, stories, formatDate, editIcon, deleteIcon })
})


// @desc    Register
// @route   POST / register
router.post('/register', ensureGuest ,async (req, res) => {
    const { name, email, password, password2 } = req.body;
    const { errors, valid } = registerValidation(name, email, password, password2)
    if(!valid) {
        return res.send(errors)
    }
    const user = await User.findOne({email}) 
    if(user) {
        console.log(user)
        return res.send('A user with this email already exist')
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
   const newUser = new User({
    name,
    email,
    password: hashPassword
   })
    await newUser.save()
    res.redirect('/')
})


// @desc    Login
// @route   POST / login
router.post('/login', ensureGuest, (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
    })(req, res, next)

})  

// @desc    Logout
// @route   GET / logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
}) 


module.exports = router;