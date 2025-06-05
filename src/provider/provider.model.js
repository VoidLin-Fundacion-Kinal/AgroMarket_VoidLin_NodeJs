import { model, Schema } from "mongoose";

const providerSchema = Schema(
    {
        providerName:{
            type:String,
            required: true,
            unique: true
        },
        description:{
            type:String,
            required:true
        },
        typeOfProduct:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        telephone:{
            type:String,
            required:true
        },
        representative:{
            type:String,
            requried:true,
            unique:true
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)

export default model('Provider', providerSchema)