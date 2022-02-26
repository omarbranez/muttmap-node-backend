import express from 'express'
import { getAllBreeds, getOneBreed } from '../controllers/breedController.js'
const router = express.Router()

router.route('/').get(getAllBreeds)
router.route('/:id').get(getOneBreed)

export default router