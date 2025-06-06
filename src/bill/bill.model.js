import { model } from "mongoose";

const billSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cart:{
            type:Schema.Types.ObjectId,
            ref:'CartShopping',
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        },
        total:{
            type:Number,

        },
        subtotal:{
            type:Number
        },
        estado:{
            type:String,
            enum:['PAGADO','ELIMINADO']

        }
    }
)

export default model ('Bill',billSchema)