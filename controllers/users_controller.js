import mongoose from 'mongoose'
import User from '../models/user_model.js'

export const getUsers = async (req, res) => {
    try {
        const notes = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id: _id} = req.params   
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("User not found")
    const updateUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json(updateUser)
}

export const deleteUser = async (req, res) => {
    const { id: _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("User not found")
    await User.findByIdAndDelete(_id)
    res.json({ message: "User deleted"})
}