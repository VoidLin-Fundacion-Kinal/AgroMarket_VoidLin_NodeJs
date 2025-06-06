import { model,Schema } from "mongoose";

const postSchema = Schema(
    {
        title:{
           type:String,
           required:[true, 'title is requried'],
           maxLength : [50, `Can't be overcome 50 characters`]
        },
        description:{
            type:String,
           required:[true, 'description is requried'],
           maxLength : [200, `Can't be overcome 200 characters`]
        },
        date:{
            type:Date,
            default:Date.now
        },
        image:{
            type:String
        },
        direction:{
            type:String,
            required: [true, 'Direction is required'],
            maxLength: [90, `Can't be overcome 90 characters`]
        },
        user:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        }
    }

)

export default model('Post',postSchema)