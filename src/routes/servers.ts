import { sendServer } from "../controllers/server"
import { validateServer } from "../middlewares/validation"

const router = require('express').Router()

router.post('/',validateServer,sendServer)

export default router
