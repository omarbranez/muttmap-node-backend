import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const register = async(req,res) => {
    const { username, password, location } = req.body
    if (!username || !password ) {
        throw new BadRequestError("Please fill all fields")
    }

    const duplicateUser = await User.findOne({username})
    if (duplicateUser) {
        throw new BadRequestError("That user name already exists")
    }

    const user = await User.create({ username, password })
    const token = user.createToken()

    res.status(StatusCodes.OK).json({ user: {username: user.username}, token, location: [user.lat, user.lng] })
}

const login = async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequestError("Please fill all fields")
    }

    const user = await User.findOne({ username }).select(`+password`)
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const correctPassword = await user.matchPassword(password)
    if (!correctPassword){
        throw new UnauthenticatedError("Password incorrect")
    }

    const token = user.createToken()
    user.password = undefined
    
    res.status(StatusCodes.OK).json({ user, token, location: [user.lat, user.lng]})
}

const updateUser = async(req, res) => {
    console.log("update user route")
}

export { register, login, updateUser }