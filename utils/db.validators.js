import User from '../src/user/user.model.js'
import Category from './../src/category/category.model.js'
import Provider from './../src/provider/provider.model.js'
import Product from './../src/product/product.model.js'
import { body, param } from 'express-validator';
import mongoose from 'mongoose';



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
    const alreadyCui = await User.findOne({ "personalData.cui": cui }) 
    if (alreadyCui) {
        throw new Error('CUI is already taken') 
    }
} 

export const existNit = async (nit, { req }) => {
    const alreadyNit = await User.findOne({ "personalData.nit": nit }) 
    if (alreadyNit) {
        throw new Error('NIT is already taken') 
    }
} 


export const existPhone = async (phone, user)=>{
    const alreadyPhone =  await User.findOne({phone})
    if(alreadyPhone && alreadyPhone._id !=user._id){
        console.error(`Phone ${phone} is already taken`)
        throw new Error(`Phone ${phone} is already taken`)
    }
}

export const existCategory = async (name) => {
    const alreadyCategory = await Category.findOne({ name: name.trim().toLowerCase() });
    if (alreadyCategory) {
        console.error(`Category '${name}' is already registered`);
        throw new Error(`Category '${name}' is already registered`);
    }
};


// ---------------- Provider validators ----------------
export const existProvider = async (name) => {
    const alreadyProvider = await Provider.findOne({ name: name.trim() });
    if (alreadyProvider) {
        console.error(`Provider '${name}' is already registered`);
        throw new Error(`Provider '${name}' is already registered`);
    }
};

export const existEmailProvider = async (email) => {
    const alreadyEmail = await Provider.findOne({ email: email.trim()});
    if (alreadyEmail) {
        console.error(`Email '${email}' is already registered`);
        throw new Error(`Email '${email}' is already registered`);
    }  
}

export const existPhoneProvider = async (phone) => {
    const alreadyPhone = await Provider.findOne({ phone: phone.trim() });
    if (alreadyPhone) {
        console.error(`Phone '${phone}' is already registered`);
        throw new Error(`Phone '${phone}' is already registered`);
    }
}

export const isValidObjectId = (value, { req }) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ObjectId');
  }
  return true;
}


// ---------------- Product validators ----------------

export const existProduct = async(name) => {
    const alreadyProduct = await Product.findOne({ name: name.trim()});
    if (alreadyProduct) {
        console.error(`Product '${name}' is already registered`);
        throw new Error(`Product '${name}' is already registered`);
    }
}

// ---------------- Publicaciones validators ----------------
//No se realizan =)






































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