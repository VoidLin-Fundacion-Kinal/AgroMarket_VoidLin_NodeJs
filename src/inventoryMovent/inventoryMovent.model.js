/* import { Schema, model } from "mongoose";

const inventoryMoventSchema = Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        amount:{
            type: Number,
            requerid: [true, 'The amount is necessary'],
            min: 0,
            default:0
        },
        tipe:{
            type: String,
            requerid: [true, 'You must specify the type'],
            enum:{
                values:['Entrance', 'Exit'],
                message: '{VALUE} is not a valid type'
            },
            trim: true
        },
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            requerid: [true, 'The product is required']
        },
    }
)
export default model('InventorMovent', inventoryMoventSchema) */