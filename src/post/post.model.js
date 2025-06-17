import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    title: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 5
    },

    date: {
        type: Date,
        default: Date.now
    },

    description: {
        type: String,
        required: true,
        maxLength: 500,
        minLength: 5
    },

    address: {
        type: String,
        required: true,
        maxLength: 75,
        minLength: 5
    },

    images: [
        {
            type: String,
            default: ['images/providerImages/Avatar-Default.jpg']
        }
    ],

    personalData: {
        cui: {
            type: String,
            required: true,
            minLength: 13,
            maxLength: 13
        },

        nit: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 10
        }
    },

    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },

            comment:{
                type: String,
                maxLength: 300,
            },

            date:{
                type: Date,
                default: Date.now
            },
            isActive: {
            type: Boolean,
            default: true
        }
        }
    ],
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

}) 


export default model('Post', postSchema)
