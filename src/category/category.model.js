import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [1, 'Description must be at least 1 characters long'], 
            maxLength: [100, 'Description must be at most 100 characters long']
        },
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

categorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject()  // Convierte un documento de MongoDB a Objeto de JS
    return category
}

export default model('Category', categorySchema)