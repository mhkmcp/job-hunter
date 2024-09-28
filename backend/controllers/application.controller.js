import { Job } from "../models/job.model.js"
import { Application } from '../models/application.model.js'


export const applyJob = async(req, res) => {
    try {
        const userId = req.id 
        const jobId = req.params.id

        if(!jobId) {
            return res.status(400).json({
                message: "Job id is required!",
                success: false
            })
        }
        // check if the user already applied for the job
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId
        })

        if(alreadyApplied){
            return res.status(400).json({
                message: "You have already applied for this job!",
                success: false
            })
        }

        // check if the job exists
        const job = await Job.findById(jobId)
        if(!job) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }
        // create new job
        const application = await Application.create({
            job: jobId,
            applicant: userId,
        })
        // add the application to the jobs application array
        job.applications.push(application._id)
        await job.save()

        return res.status(201).json({
            message: "Job applied successfully!",
            success: true,
            job
        })
        
    } catch (error) {
        console.log(error.message)
    }
}


export const getAppliedJobs = async(req, res) => {
    try {
        const userId = req.id 
        const applications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}}
            }
        })

        if(!applications) {
            return res.status(404).json({
                message: "Applications not found!",
                success: false
            })
        }

        return res.status(201).json({
            message: "Applications applied are retrieved successfully!",
            success: true,
            applications
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const getApplicantsByJobId = async(req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {sort: {createdAt: -1}},
            populate:{
                path: "applicant"
            }
        })

        if(!job) {
            return res.status(404).json({
                message: "Jobs not found!",
                success: false
            })
        }

        return res.status(201).json({
            message: "Applicants are retrieved successfully!",
            success: true,
            job
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const updateStatus = async(req, res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if(!status) {
            return res.status(404).json({
                message: "Status not found!",
                success: false
            })
        }
        // find application by applicant id
        const application = await Application.findOne({_id:applicationId})
        if(!application) {
            return res.status(404).json({
                message: "Application not found!",
                success: false
            })
        }
        // update status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status updated successfully!",
            success: true,
            application
        })
    } catch (error) {
        console.log(error.message)
    }
}