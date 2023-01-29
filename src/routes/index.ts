import { Router } from 'express'
import auth from '../middlewares/auth'
import authRouter from './auth'
import usersRouter from './users'
import serversRouter from './servers'
import productsRouter from './products'

const router = Router()

router.use('/auth', authRouter)
router.use(auth)
router.use('/users', usersRouter)
router.use('/servers', serversRouter)
router.use('/products', productsRouter)

export default router
