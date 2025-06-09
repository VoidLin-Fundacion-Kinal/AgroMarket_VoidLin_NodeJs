import {Schema, model} from 'mongoose'

const cartSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        items: [
            {
                product:{
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                },

                quantity: {
                    type: Number
                }
            }
        ],

        total:{
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ['active', 'ordered', 'cancelled', 'abandoned'],
            default: 'active'
        },

        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Cart', cartSchema)

