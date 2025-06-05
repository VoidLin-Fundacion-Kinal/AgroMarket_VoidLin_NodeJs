import { Schema, model } from "mongoose";

const cartShoppingSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products:[
            {
                product:{
                    type:Schema.Types.ObjectId,
                    ref: 'Products'
                },
                cantidad:{
                    type:Number
                }
            }
        ],
        total:{
            type:Number
        },
        status:{
            type:String,
            enum: ['ACTIVO','CANCELADO'],
            default: 'CANCELADO'
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
)

export default model('CartShopping', cartShoppingSchema)