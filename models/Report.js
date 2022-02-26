import mongoose from 'mongoose'
const ReportSchema = new mongoose.Schema(
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
        dogName: {
            type: String,
            required: true,
            default: "Unknown",
        },
        dogColor: {
            type: String,
            required: true,
            default: "Unknown",
        },
        dogAge: {
            type: Number,
            required: true,
            default: 0,
        },
        dogGender: {
            type: String,
            required: true,
            default: "Unknown",
        },
        dogFeatures: {
            type: String,
            required: true,
            default: "Not Provided",
        },
        dogDemeanor: {
            type: String,
            required: true,
            default: "Not Provided"
        },
        reportLat: {
            type: Number,
            required: [true, "Please provide latitude"],
        },
        reportLng: {
            type: Number,
            required: [true, "Please provide longitude"],
        },
        reportShow: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export default Report