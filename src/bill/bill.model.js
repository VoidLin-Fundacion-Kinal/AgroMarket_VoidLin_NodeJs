import {Schema, model} from 'mongoose'

const billSchema = new Schema (
    {
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            required: true
        },
        
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ['paid', 'pendig', 'cancelled'],
            default: 'pending'
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
    }
)

export default model('Bill', billSchema)