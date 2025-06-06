import {Schema, model} from 'mongoose'

const CommentSchema = Schema(
    {
        date:{
            type: Date,
            default: Date.now
        },
        description:{
            type: String,
            trim: true,
            requerid: [true,  'Description is required'],
            maxlength: [500, 'The comment cannot have more than 500 characters.']
        },
        post:{
            type: Schema.Types.ObjectId,
            ref: 'Post',
            requerid: [true, 'Publication is required']
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            requerid: [true, 'The user is required']
        },
    }
)

export default model('Comment', CommentSchema)