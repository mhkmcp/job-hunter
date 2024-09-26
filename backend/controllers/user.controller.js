import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js"

export const register = async(req, res) => {
    try {
        const { fullname, email, phone, password, role } = req.body
        console.log(fullname, email, phone, password, role)

        if(!fullname || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }  
        console.log('after first if')
        const user = await User.findOne({email})
        if(user) {
            console.log('user found if')

            return res.status(409).json({
                message: "User exist with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)  
        User.create({
            fullname, 
            email, 
            phone, 
            password: hashedPassword, 
            role
        })

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        return res.status(error.status).json({
            message: `${error.message}`,
            success: false
        }) 
    }
}

export const login = async( req, res) => {
    try {
        const { email, password, role } = req.body

        if(!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }  
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                message: "Incorrect Email or Password!",
                success: false
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)  
        if(!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect Email or Password!",
                success: false
            })
        }
        
        // check user role 
        if(role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role!",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"})

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, 
            {maxAge: 24*60*60*1000, httpsOnly: true, sameSite:"strict"}
        ).json({
            message: `Welcome ${user.fullname}`,
            user: user,
            success: true
        })
        
    } catch (error) {
        return res.status(error.status).json({
            message: `${error.message}`,
            success: false
        })
    }
}

export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone, bio, skills } = req.body
        
        const file = req.file
        // cloudinary 
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        let skillsArray
        if(skills){
            skillsArray = skills.split(",")
        }
        const userId = req.id  // middleware authentication
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // data update
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phone)  user.phone = phone
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // resume 
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url      // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname     // Save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}