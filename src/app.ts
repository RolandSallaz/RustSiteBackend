import { PORT, corsSettings, MONGO_URL } from './utils/config'
import mongoose from 'mongoose'
import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import { steamPassport } from './passport/steam'
import cors from 'cors'
import { ISteamUser } from './utils/Interfaces'
import errorHandler from './middlewares/errorHandler'
import { requestLogger, errorLogger } from './middlewares/logger'
import helmet from 'helmet'
import { limiter } from './middlewares/rateLimiter'
import { errors } from 'celebrate'
import { checkAndUpdateServers } from './utils/rconUtil'
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')

const app = express()

passport.serializeUser((user: ISteamUser, done: any) => done(null, user))
passport.deserializeUser((user: ISteamUser, done: any) => done(null, user))
passport.use(steamPassport)
app.use(
  session({
    secret: 'Whatever_You_Want', //todo брать ключ из env 
    saveUninitialized: true,
    resave: false,
  }),
)
setInterval(checkAndUpdateServers, 10000)
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // 10 mb limit
    },
    abortOnLimit: true,
  }),
)
app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(limiter)
app.use(helmet())
app.use(passport.initialize())
app.use(passport.session())
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL)
app.use(cors(corsSettings))
app.use(requestLogger)
app.use(routes)
app.use(errorLogger)
app.use(errors())
app.use(errorHandler)

app.listen(PORT)
