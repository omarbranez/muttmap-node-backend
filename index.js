import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './routes/users_routes.js'
// import files for initialization

dotenv.config()

// create instance of express
const app = express()

// use middleware
app.use(cors())
app.use(express.json())

// port information for mongodb
const CONNECTION_URL = process.env.MUTTMAP_DB_URL
const PORT = process.env.PORT

// use connect method with port info and options object to establish connection
mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// keep track of port being used
    .then(()=> app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
// log error messages
    .catch((e) => console.log(e.message))

// set up initial root route
app.use('/', (req, res) => res.status(200).json({ message: "Hello World" }))
app.use('/users', users)
app.use("*", (res, res) => res.status(404).json({ message: "Page Not Found" }))

export default app