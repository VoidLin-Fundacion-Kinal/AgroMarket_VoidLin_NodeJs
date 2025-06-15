import {Schema, model} from 'mongoose'

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 30
        },

        description:{
            type: String,
            required: true,
            maxLength: 50
        },

        price: {
            type: Number,
            required: true,
        },
         
        weigth: {
            type: String,
            required: true,
        },
        
        image: 
            {
                type: String,
            }
        ,


        stock: {
            type: Number,
            default: 0
        },
        
        provider: {
            type: Schema.Types.ObjectId,
            ref: 'Provider',
            required:true
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Product', productSchema)