import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
    {
        reporter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        breed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
        reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        name: {
            type: String,
            trim: true
        },
        color: {
            type: String
        }
        age: {
            type: Number
        }
        lat: {
            type: String
        },
        lng: {
            type: String
        },
        features: {
            type: String,
            trim: true
        },
        demeanor: {
            type: String,
            trim: true
        }
        show: {
            type: Boolean
        },
        created: {
            type: Date, 
            default: Date.now()
        }
    }
)