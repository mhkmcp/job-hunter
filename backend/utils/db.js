import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected Successfully!`)
        return database
    } catch (error) {
        console.log(`${error.message}`)
    }
}

export default connectDB