import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const CONNECTION_URL = process.env.MUTTMAP_DB_URL
const PORT = process.env.PORT

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
    .catch((e) => console.log(e.message))

app.use('/', (req, res) => res.status(200).json({ message: "Hello World" }))

export default app