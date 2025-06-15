import {Schema, model} from 'mongoose'

const categorySchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [20, `Can't be overcome 20 characters`]
        },
        
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {versionKey: false}
)

export default model('Category', categorySchema)