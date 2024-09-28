import { json } from 'express'
import { Company } from '../models/company.model.js'

export const registerCompany = async(req, res) => {
    try {
        const { companyName } = req.body

        if(!companyName) {
            return res.status(400).json({
                message: "Company name is required!",
                success: false
            })
        }
        let company = await Company.findOne({name: companyName})
        if(company) {
            return res.status(400).json({
                message: "You cannot register an existing company!",
                success: false
            })
        }

        company = Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company registered successfully!",
            company,
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }

}


export const getCompany = async(req, res) => {
    try {
        const userId = req.id
        const companies = Company.find({userId})
        if(!companies) {
            return res.status(404).json({
                message: "You do not have a company yet!",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const getCompanyById = async(req, res) => {
    try {
        const {companyId} = req.params.id
        const company = Company.findById(companyId)

        if(!id) {
            if(!company) {
                return res.status(404).json({
                    message: "Company does not exists with the id!",
                    success: false
                })
            }
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const updateCompanyById = async(req, res) => {
    try {
        const {name, description, website, location} = req.body
        const file = req.file
        // cloudinary will be added here

        const updateData = {name, description, website, location}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})

        if(!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company updated successfully!",
            company,
            success: true
        })
        
    } catch (error) {
        console.log(error.message)
    }
}