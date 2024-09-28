import express from 'express'
import { registerCompany, getCompany, getCompanyById, updateCompanyById } from '../controllers/company.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.route('/register').post(isAuthenticated, registerCompany)
router.route('/all').get(isAuthenticated, getCompany)
router.route('/:id').get(isAuthenticated, getCompanyById)
router.route('/update/:id').put(isAuthenticated, updateCompanyById)

export default router