const express = require('express');
const router = express.Router()
const Story = require('../model/Story')
const { formatDate, editIcon, deleteIcon } = require('../../utils/helper')


// @desc    Story
// @route   GET / stories
router.get('/story', (req, res) => {
    res.render('addStory')
})

router.post('/stories', async (req, res) => {
        req.body.user = req.user.id;
        const { title, body, status } = req.body;
        console.log(req.body)
        await Story.create(req.body)
        res.status(201).redirect('/dashboard')
}) 

router.get('/delete/:id', async (req, res) => {
    const user = req.user;
    const story = await Story.findOne({ _id: req.params.id})
    if(user._id.toString() === story.user.toString()) {
        await Story.deleteOne({ _id: req.params.id})
    }else {
        console.log('Not match')
    }
    res.redirect('/dashboard')
})

router.get('/edit/:id', async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id})
    if(story.user.toString() === req.user.id.toString()) {
        res.render('edit', { story })
    } else {
        console.log('This story is not your\'s')
    }
})

router.post('/edit:id', async (req, res) => {
    const story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
    res.redirect('/dashboard')
})

router.get('/allStories', async (req, res) => {
    const user = req.user;
    const stories = await Story.find({user}).populate('user').sort({ createdAt: -1 })
    res.render('allStories', { stories, formatDate, editIcon, deleteIcon, user })
})

module.exports = router;