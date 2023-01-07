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
import { checkAndUpdateServers } from './utils/serverChecker'
const fs = require('fs')

const { Client } = require('rustrcon')

//rcon test
export const rcon = new Client({ ip: '185.244.6.37', port: 28016, password: '199812' })
rcon.login()
rcon.on('connected', () => {
 
})
rcon.on('message', (message: any) => {
  const writer = fs.createWriteStream('./logs/serverLog.txt',{ 'flags': 'a'
  , 'encoding': null
  , 'mode': '0666'
  })
  writer.write(JSON.stringify(message)+"\r\n")
})
rcon.on('error', (err: Error) => {
  console.log(err)
})

//
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
setInterval(checkAndUpdateServers, 1000)
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
