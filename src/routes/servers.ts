import { deleteServer, getServers, sendServer } from '../controllers/server'
import adminOnly from '../middlewares/adminOnly'
import { validateServer } from '../middlewares/validation'

const router = require('express').Router()

router.get('/', getServers)
router.post('/', adminOnly, validateServer, sendServer)
router.delete('/:id', adminOnly, deleteServer)

export default router
