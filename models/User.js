import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            trim: true, 
            unique: true,
            minlength: 3,
            maxlength: 15,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8,
            select: false,
        },
        lat: {
            type: String,
        },
        lng: {
            type: String,
        }
        // reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report'}],
        // reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction'}],
        // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
)

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createToken = function(){
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.matchPassword = async function(password){
    const passwordMatch = await bcrypt.compare(password, this.password)
    return passwordMatch
}

const User = mongoose.model("User", userSchema)

export default User