import { deleteServer, getServers, sendServer, sendServerCommand } from '../controllers/server'
import adminOnly from '../middlewares/adminOnly'
import { validateServer } from '../utils/validation'

const router = require('express').Router()

router.get('/', getServers)
router.post('/:id',sendServerCommand)
router.post('/', adminOnly, validateServer, sendServer)
router.delete('/:id', adminOnly, deleteServer)

export default router
