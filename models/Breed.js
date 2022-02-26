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
        breedGroup: {
            type: String,
            default: "Unknown"
        },
        bredFor: {
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