import {Schema, model} from 'mongoose'

const providerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [15, `Can't be overcome 15 characters`]
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength:[50 , `Can't be overcome 50 characters`]
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            maxLength: [20, `Can't be overcome 20 characters`]
        },

        typeProduct:{
            type: String,
            required: [true, 'TypeProduct is required'],
            maxLength:[50, `Can't ba overcome 50 characters`]
        },

        phone: {
            type: String, 
            required: [true, 'Phone is required'],
            maxLength: [8, `Can't be overcome 8 characters`]
        },

        legalRepresentative:{
            type: String, 
            required: [true, 'Legal-Representative is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },

        logo:{
            type: String,
            default: '../images/profileImages/Avatar-Default.jpg'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        deactivationReason: {
            type: String,
            default: null
        },
        deactivatedAt: {
            type: Date,
            default: null
        }
    }
)

export default model('Provider', providerSchema)