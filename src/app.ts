import {PORT, corsSettings, MONGO_URL} from './utils/config'
import mongoose from 'mongoose'
import express, {NextFunction, Request, Response} from 'express'
import routes from './routes'
import {steamPassport} from './passport/steam'
import cors from 'cors'
import {ISteamUser} from './utils/Interfaces'
import errorHandler from './middlewares/errorHandler'
import {requestLogger, errorLogger} from './middlewares/logger'

const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')

const app = express()

passport.serializeUser((user: ISteamUser, done: any) => done(null, user))
passport.deserializeUser((user: ISteamUser, done: any) => done(null, user))
passport.use(steamPassport)
app.use(
    session({
        secret: 'Whatever_You_Want',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 300000,
        },
    }),
)
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(MONGO_URL)
app.use(cors(corsSettings))
app.use(requestLogger)
app.use(routes)
app.use(errorLogger)
app.use(errorHandler)
app.listen(PORT, () => console.log(`App listening ons port ${PORT}`))
