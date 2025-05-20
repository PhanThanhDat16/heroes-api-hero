import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { routerHero } from './router/heroAPI.router'
import connectMongoDB from './config/mongoose.config'


dotenv.config()

connectMongoDB()

const app = express()
app.use(cors())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', routerHero)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
