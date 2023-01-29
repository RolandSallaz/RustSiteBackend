require('dotenv').config()

export const {
  PORT = 8000,
  API_KEY = '9E352D607BEEB3F03B5160F0B9EEADC9',
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

export const ipRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
export const portRegex = new RegExp(/^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/gm);