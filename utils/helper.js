const moment = require('moment')

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    editIcon: function(storyUser, loggedUser, storyId, floating = true) {
        if(storyUser._id.toString() == loggedUser._id.toString()) {
            if(floating) {
                return `<a href='/edit/${storyId}' class='btn-floating halfway-fab blue'>
                <i class='fas fa-edit fa-small'></i></a>`
            } else {
                return `<a href='/edit/${storyId}'><i class='fas fa-edit'></i></a>`
            }
        } else {
            return ''
        }
    },

    deleteIcon: function(storyUser, loggedUser, storyId) {
        if(storyUser._id.toString() === loggedUser._id.toString()) {
            return `
                <a href='/delete/${storyId}'><i class="fa-solid fa-trash"></i></a>
            `
        } else {
            return ''
        }
    }
}