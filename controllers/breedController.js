import Breed from '../models/Breed.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const getAllBreeds = async(req, res) => {
    const breeds = await Breed.find({})
    res.status(StatusCodes.OK).json( {breeds})
}

const getOneBreed = async(req, res) => {
    const { id } = req.params.id
    const breed = await Breed.findById(id)
    if (!breed) {
        throw new BadRequestError("Breed not found")
    }
    res.status(StatusCodes.OK).json({ breed })
}

// const createBreeds = async

export { getAllBreeds, getOneBreed }