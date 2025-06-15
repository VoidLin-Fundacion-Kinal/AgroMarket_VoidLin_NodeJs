import {Schema, model} from 'mongoose'

const inventoryMovementSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },

        date: {
            type: Date,
            default: Date.now
        },

        amount: {
            type: Number,
            required: true,
        },

        inputType: {
            type: String, 
            required: true,
            enum: ['entry','exit' ]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }
)

export default model('InventoryMovement', inventoryMovementSchema)