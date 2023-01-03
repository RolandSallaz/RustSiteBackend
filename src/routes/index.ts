import { Router } from 'express'
import auth from '../middlewares/auth'
import authRouter from './auth'
import usersRouter from './users'
const router = Router()

router.use('/auth', authRouter)
router.use(auth)
router.use('/users', usersRouter)

export default router
