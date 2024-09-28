import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { getAllJobs, getJobById, getJobsByAdmin, postJob } from '../controllers/job.controller.js'

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob)
router.route('/all').get(isAuthenticated, getAllJobs)
router.route('/:id').get(isAuthenticated, getJobById)
router.route('/admin').put(isAuthenticated, getJobsByAdmin)

export default router