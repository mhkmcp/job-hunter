import { Job } from '../models/job.model.js'


export const postJob = async(req, res) => {
    try {
        const { title, description, requirements, salary, jobType, experience, position, companyId } = req.body
        const userId = req.id 
        
        if(!title || !description || !requirements || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }

        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(","), 
            salary: Number(salary), 
            jobType, 
            experience, 
            position, 
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            message: "Job created successfully!",
            success: true,
            job
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const getAllJobs = async(req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title: {$regex:keyword, $options: "i"}},
                {description: {$regex:keyword, $options: "i"}},
            ]
        }
        const jobs = await Job.find(query).populate({path: "company"}).sort({createdAt: -1})

        if(!jobs) {
            return res.status(404).json({
                message: "Jobs not found!",
                success: false
            })
        }

        return res.status(200).json({
            message: "Jobs retrieved successfully!",
            success: true,
            jobs
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id || ""
        const job = await Job.findById(jobId)

        if(!job) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job retrieved successfully!",
            success: true,
            job
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

// for Admin
export const getJobsByAdmin = async(req, res) => {
    try {
        const adminId = req.id 
        const jobs = await Job.find({createdBy: adminId})

        if(!jobs) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job retrieved by Admin successfully!",
            success: true,
            jobs
        })
        
    } catch (error) {
        console.log(error.message)
    }
}