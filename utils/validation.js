const User = require("../server/model/User")

module.exports = {
    registerValidation: function(name, email, password, password2) {
        let errors = {}
        if(name.trim() === '') {
            errors.name = 'Name is required'
        } else {
            const nRE = /^([a-zA-Z0-9]{3,15})$/
            if(!nRE.test(name)) {
                errors.name = 'Inser valid name and must be between 3 to 15 character'
            }
        }

        if(email.trim() === '') {
            errors.email = 'Email is required'
        } else  {
            const eRE = /^([a-zA-Z0-0_\-\.]+)@([a-zA-Z0-0_\-\.]+)\.([a-zA-Z]{2,5})$/
            if(!eRE.test(email)) {
                errors.email = 'Enteer a valid email'
            }
        }

        if(password.trim() === '') {
            errors.password = 'password is requried'
        } else {
            const pRE = /^[a-zA-Z0-9]{5,15}$/
            if(!pRE.test(password)) {
                errors.password = 'Enter a valid password'
            }
        }

        if(password2.trim() === '') {
            errors.password = 'password confirmation is requried'
        } else if(password2 !== password) {
            errors.password = 'Password does not match'
        }

    
        return {
            errors,
            valid: Object.keys(errors).length < 1
        }
    },

    loginValidation: function(email, password) {
        const errors = {}
        if(email.trim() === '') {
            errors.email = 'Email is required'
        } else  {
            const eRE = /^([a-zA-Z0-0_\-\.]+)@([a-zA-Z0-0_\-\.]+)\.([a-zA-Z]{2,5})$/
            if(!eRE.test(email)) {
                errors.email = 'Enteer a valid email'
            }
        }

        if(password.trim() === '') {
            errors.password = 'password is requried'
        } else {
            const pRE = /^[a-zA-Z0-9]{5,15}$/
            if(!pRE.test(password)) {
                errors.password = 'Enter a valid password'
            }
        }

        return {
            errors,
            valid: Object.keys(errors).length < 1
        }
    }
}