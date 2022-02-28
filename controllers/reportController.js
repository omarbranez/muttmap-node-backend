import Report from "../models/Report.js"
import Image from "../models/Image.js"
import Breed from '../models/Breed.js'
import fs from 'fs'
import { StatusCodes } from "http-status-codes"

import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import User from "../models/User.js"
import { Console } from "console"
const getAllReports = async(req, res) => {
    const reports = await Report.find({}).populate('createdBy', 'username').populate('breed', 'name')
    res.status(StatusCodes.OK).json({ reports })
}  

const createNewReport = async(req, res) => {
    const user = await User.findOne({id : req.body.userId} )
    req.body.createdBy = user
    const breed = await Breed.findOne({id: req.body.breedId})
    req.body.breed = breed
    const report = await Report.create(req.body)
    const reports = await Report.find({})
    res.status(StatusCodes.CREATED).json({ reports, report })
}

export {getAllReports, createNewReport}