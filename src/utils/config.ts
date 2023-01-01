require('dotenv').config()
const SteamAuth = require('node-steam-openid')

export const {
  PORT = 8000,
  API_KEY = '771DB037402F9B91ED9A3F1DAFFEBB90',
  FRONT_URL = 'localhost',
  MONGO_URL = 'mongodb://localhost:27017/test'
} = process.env

export const steam = new SteamAuth({
  realm: `http://localhost:8000`, // Site name displayed to users on logon
  returnUrl: "http://localhost:8000/auth/steam/authenticate", // Your return route
  apiKey: '771DB037402F9B91ED9A3F1DAFFEBB90', // Steam API key
})

export const corsSettings = {
  credentials: true,
  origin: [
    'http://localhost:3000',
  ]
}