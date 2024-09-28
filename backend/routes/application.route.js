import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { applyJob, getAppliedJobs, getApplicantsByJobId, updateStatus } from '../controllers/application.controller.js'

const router = express.Router()

router.route('/:id').get(isAuthenticated, applyJob)
router.route('/all').get(isAuthenticated, getAppliedJobs)
router.route('/:id/applicants').get(isAuthenticated, getApplicantsByJobId)
router.route('/update').post(isAuthenticated, updateStatus)

export default router