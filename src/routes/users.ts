import { getCurrentUser } from "../controllers/user"

const router = require('express').Router()

router.get('/me',getCurrentUser);

export default router
