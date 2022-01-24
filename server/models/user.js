import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim:: true, 
            unique: true,
            required: true,
        },
        hash_password: {
            type: String
        },
        reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report'}],
        reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction'}],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
)

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
}

const User = mongoose.model("User", userSchema)

export default User