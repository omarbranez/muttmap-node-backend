import express from 'express'
import { getAllReports, createNewReport, getOneReport } from '../controllers/reportController.js'
// import upload from '../middleware/upload.js'

const router = express.Router()

router.route('/').get(getAllReports)
router.route('/create').post(createNewReport)
router.route('/:id').get(getOneReport)

export default router