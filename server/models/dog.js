import mongoose from 'mongoose'

const dogSchema = new mongooseSchema(
    {
        breed: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
            trim: true
        },
        temperament: {
            type: String,
            trim: true,
            required: true
        },
        lifeSpan: {
            type: String,
            trim: true
        },
        weight: {
            type: String,
            trim: true
        },
        height: {
            type: String,
            trim: true
        },
    }
)

const Dog = mongoose.model("Dog", dogSchema)

export default Dog