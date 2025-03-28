// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()


// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app)
require('./config/session.config')(app)

// default value for title local
const projectName = 'lab-express-basic-auth'
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

// 👇 Start handling routes here
const index = require('./routes/index')
app.use('/', index)

const authRouter = require('./routes/auth.routes')
const { isLoggedOut } = require('./middleware/route-guard')
app.use('/auth', isLoggedOut, authRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
