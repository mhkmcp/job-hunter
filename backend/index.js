import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'


dotenv.config({})

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 4000

// API
app.use('/api/v1/user', userRoute)

app.listen(PORT, ()=>{
    const db = connectDB()
    console.log(`Server running at ${PORT}`)
})