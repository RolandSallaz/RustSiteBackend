require('dotenv').config()

export const {
  PORT = 8000,
  API_KEY = '771DB037402F9B91ED9A3F1DAFFEBB90',
  CLIENT_URL = 'https:localhost:3000',
  MONGO_URL = 'mongodb://localhost:27017/test',
  SECRET_KEY = 'sectet'
} = process.env



export const corsSettings = {
  credentials: true,
  origin: [
    'http://localhost:3000',
  ]
}