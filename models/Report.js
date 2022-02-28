import mongoose from 'mongoose'
const reportSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, "Must be associated with a user"]
        },
        breed: {
            type: mongoose.Types.ObjectId,
            ref: 'Breed',
            required: [true, "Must be associated with a breed"]
        },
        name: {
            type: String,
            required: true,
            default: "Unknown",
        },
        color: {
            type: String,
            required: true,
            default: "Unknown",
        },
        age: {
            type: Number,
            required: true,
            default: 0,
        },
        gender: {
            type: String,
            required: true,
            default: "Unknown",
        },
        features: {
            type: String,
            required: true,
            default: "Not Provided",
        },
        demeanor: {
            type: String,
            required: true,
            default: "Not Provided"
        },
        lat: {
            type: Number,
            required: [true, "Please provide latitude"],
        },
        lng: {
            type: Number,
            required: [true, "Please provide longitude"],
        },
        show: {
            type: Boolean,
            default: false,
        },
        imageUrl: {
            type: String,
            required: true,
            default: "Not Provided",       
        }
    },
    { timestamps: true }
)
const Report = mongoose.model("Report", reportSchema)
export default Report