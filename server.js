// console.log("Server Running")
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()

dotenv.config()

// morgan logs http requests in terminal
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send({msg: 'Welcome to Node!'})
})

app.get('/api/v1', (req, res) => {
    res.send({msg:'Welcome to API V1!'})
})

app.use('/api/v1/auth', authRouter)

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