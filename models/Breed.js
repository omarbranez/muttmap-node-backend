import mongoose from 'mongoose'
const breedSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        temperament: {
            type: String,
            default: "Unknown"
        },
        lifeSpan: {
            type: String, 
            default: "Unknown"
        },
        weight: {
            type: String,
            default: "Unknown"
        },
        height: {
            type: String,
            default: "Unknown"
        },
        group: {
            type: String,
            default: "Unknown"
        },
        purpose: {
            type: String,
            default: "Unknown"
        },
        imageUrl: {
            type: String,
            default: "Unknown"
        },

    }
)
const Breed = mongoose.model("Breed", breedSchema)
export default Breed