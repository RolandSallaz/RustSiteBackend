import mongoose from 'mongoose'
import express from 'express'
import routes from './routes'
import {
  PORT,
  API_KEY,
  FRONT_URL,
  corsSettings,
  MONGO_URL,
} from './utils/config'


const cors = require('cors')

const app = express()

mongoose.connect(MONGO_URL)

app.use(express.json())
app.use(cors(corsSettings))
app.use(routes)

app.listen(PORT, () => console.log(`App listening ons port ${PORT}`))
