import mongoose from 'mongoose'

const reactionSchema = new mongoose.Schema(
    {
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        report: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
        created: {
            type: Date,
            default: Date.now()
        }
    }
)

const Reaction = mongoose.model("Reaction", reactionSchema)

export default Reaction