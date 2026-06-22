import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'


dotenv.config()
const app = express()
app.use(express.json());

const PORT = process.env.PORT


app.use('/api/auth', authRoutes);

app.listen(PORT,()=>{
    console.log(`Port is running on ${PORT}`)
})