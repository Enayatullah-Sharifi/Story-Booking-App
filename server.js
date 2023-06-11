const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./server/db/db')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const expressLayout = require('express-ejs-layouts')
const passport = require('passport')
const localPassport = require('./config/localPassport')(passport)
const mongoose = require('mongoose')



dotenv.config({ path: './config/config.env'})
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}))
app.use(passport.session())
app.use(passport.initialize())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}




app.set('view engine', 'ejs')
app.set('layout', 'layouts/main')
app.use(expressLayout)

app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/story'))

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))