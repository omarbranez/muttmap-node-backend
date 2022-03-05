// console.log("Server Running")
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import breedRouter from './routes/breedRoutes.js'
import reportRouter from './routes/reportRoutes.js'
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


const app = express()

dotenv.config()



// morgan logs http requests in terminal
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
//when deploying
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/breeds', breedRouter)
app.use('/api/v1/reports', reportRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/', 'index.html'))
})

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)
// use() => all http methods (get/post/patch etc)

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`SERVER LISTENING ON PORT ${port}`)
        })
        
    } catch (error){
        console.log(error)
    }
}

start()