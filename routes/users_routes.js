import express from 'express'
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users_controller.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router