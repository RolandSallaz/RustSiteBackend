require('dotenv').config()

export const {
    PORT = 8000,
  API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  SITE_DOMAIN = 'localhost',
  PROTOCOL = 'http',
} = process.env