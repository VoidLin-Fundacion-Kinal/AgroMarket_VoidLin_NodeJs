import User from '../src/user/user.model.js'

export const existUsername = async(username, user, id) =>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && !alreadyUsername._id != user._id){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async (email, user)=>{
    const alreadyEmail =  await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id !=user._id){
        console.error(`Username ${email} is already taken`)
        throw new Error(`Username ${email} is already taken`)
    }
}

export const existCui = async (cui, { req }) => {
    const alreadyCui = await User.findOne({ "personalData.cui": cui });
    if (alreadyCui) {
        throw new Error('CUI is already taken');
    }
};

export const existNit = async (nit, { req }) => {
    const alreadyNit = await User.findOne({ "personalData.nit": nit });
    if (alreadyNit) {
        throw new Error('NIT is already taken');
    }
};


export const existPhone = async (phone, user)=>{
    const alreadyPhone =  await User.findOne({phone})
    if(alreadyPhone && alreadyPhone._id !=user._id){
        console.error(`Phone ${phone} is already taken`)
        throw new Error(`Phone ${phone} is already taken`)
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw Error(`${field} is not required`)
    }
}