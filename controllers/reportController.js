import Report from "../models/Report.js"
import Image from "../models/Image.js"
import fs from 'fs'
import { StatusCodes } from "http-status-codes"

import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
const getAllReports = async(req, res) => {
    const reports = await Report.find({})
    res.status(StatusCodes.OK).json({ reports })
}  

const createNewReport = async(req, res) => {
    console.log(req.body)
    req.body.createdBy = req.user.userId

    const img = fs.readFileSync(req.body.photo.path)
    const encodedImg = img.toString('base64')
    req.body.image = await Image.create({ contentType: req.photo.mimetype, image: Buffer.from(encodedImg, 'base64')})

    const report = await Report.create(req.body)

    res.status(StatusCodes.CREATED).json({ report })
}

export {getAllReports, createNewReport}