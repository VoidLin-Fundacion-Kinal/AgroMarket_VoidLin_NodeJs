import {body} from 'express-validator'
import {existUsername, existEmail, existCui, existNit, notRequiredField, existPhone, existCategory, existProvider, isValidObjectId, existProduct} from './../utils/db.validators.js'
import { validateErrors, validateErrorsWithoutFiles } from './validate.error.js'

//----------------- Validaciones Usuario -----------------
export const registerValidator= [

    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),

    body('name', 'Name cannot be empty')
        .notEmpty(),

    body('surname','Surname cannot be empty')
        .notEmpty(),

    body('phone','Phone cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 8, max: 8 })
        .matches(/^[2-7][0-9]{7}$/)
        .custom(existPhone),

    
    body('address','Address cannot be empty')
        .notEmpty(),

    body('email', 'Email cannot be empty')
        .notEmpty()
        .trim()
        .toLowerCase()
        .isEmail()
        .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .isLength({ max: 30 })
        .custom(existEmail),
    
    body('role', 'Role is not required')
        .optional()
        .custom(notRequiredField),

    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min:8})
        .withMessage('Password need min 8 chacarcters'),

    body('cui', 'Cui cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 13, max: 13 })
        .matches(/^[0-9]{13}$/)
        .custom(existCui),
        
    body('nit','Nit cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 7, max: 10 })
        .matches(/^[0-9]{7,8}-?[0-9]$/)
        .custom(existNit),

    body('isActive', 'isActive is not required')
        .optional()
        .custom(notRequiredField),
    
    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),
    
    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

//Validacion para el soft delete de user
export const softDeleteUserV = [
    body('userId', 'User ID is not required')
        .optional()
        .custom(notRequiredField),

    body ('username', 'Username is not required')
        .optional()
        .custom(notRequiredField),

    body('name', 'Name is not required')
        .optional()
        .custom(notRequiredField),

    body('surname', 'Surname is not required')
        .optional()
        .custom(notRequiredField),

    body('phone', 'Phone is not required')
        .optional()
        .custom(notRequiredField),

    body('address', 'Address is not required')
        .optional()
        .custom(notRequiredField), 

    body('email', 'Email is not required')
        .optional()
        .custom(notRequiredField),

    body ('password', 'Password is not required') 
        .notEmpty(),

    body('role', 'Role is not required')
        .optional()
        .custom(notRequiredField),

    body('cui', 'CUI is not required')
        .optional()
        .custom(notRequiredField),

    body('nit', 'NIT is not required')
        .optional()
        .custom(notRequiredField),

     body('isActive', 'isActive is not  required')
        .optional() 
        .custom(notRequiredField),

     body('deactivationReason', 'Deactivation reason is  required')
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }).withMessage('Deactivation Reason must be between 5 and 500 characters'),

    body('deactivatedAt', 'Deactivated at is  not required')
        .optional()
        .custom(notRequiredField),
        
    validateErrors
]

//Validacion para el  update de user
export const updateUserV = [
    body('userId')
        .optional()
        .custom(notRequiredField),,

    body('username', 'Username is optional')
        .notEmpty()
        .isLength({ min: 3, max: 15 })
        .withMessage('Username must be between 3 and 15 characters')     
        .toLowerCase()
        .optional(),

    body('name', 'Name is optional')
        .notEmpty()
        .optional(),

    body('surname', 'Surname is optional')
        .notEmpty()
        .optional(),

    body('phone', 'Phone is optional')
        .notEmpty()
        .trim()
        .isLength({ min: 8, max: 8 })
        .matches(/^[2-7][0-9]{7}$/)
        .custom(existPhone)
        .optional(),

    body('address', 'Address is optional')
        .notEmpty()
        .optional(),

    body('email', 'Email is optional')
        .notEmpty()
        .trim()
        .toLowerCase()
        .isEmail()
        .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .isLength({ max: 30 })
        .custom(existEmail)
        .optional(),

    body('password', 'Password is not required')
        .optional()
        .custom(notRequiredField),

    body('role', 'Role is not required')
        .optional()
        .custom(notRequiredField),

    body('cui', 'CUI is optional')
        .notEmpty()
        .trim()
        .isLength({ min: 13, max: 13 })
        .matches(/^[0-9]{13}$/)
        .custom(existCui)
        .optional(),

    body('nit', 'NIT is optional')
        .notEmpty()
        .trim()
        .isLength({ min: 7, max: 10 })
        .matches(/^[0-9]{7,8}-?[0-9]$/)
        .custom(existNit)
        .optional(),

    body('isActive', 'isActive is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

//Validacion para el  update de user password
export const updateUserPassword = [
    body('userId')
        .optional()
        .custom(notRequiredField),

    body('username', 'Username is not required')
        .optional()
        .custom(notRequiredField),

    body('name', 'Name is not required')
        .optional()
        .custom(notRequiredField),

    body('surname', 'Surname is not required')
        .optional()
        .custom(notRequiredField),

    body('phone', 'Phone is not required')
        .optional()
        .custom(notRequiredField),

    body('address', 'Address is not required')
        .optional()
        .custom(notRequiredField),

    body('email', 'Email is not required')
        .optional()
        .custom(notRequiredField),

    body('password', 'Password is required')
        .notEmpty(),

    body('role', 'Role is not required')
        .optional()
        .custom(notRequiredField),

    body('cui', 'CUI is not required')
        .optional()
        .custom(notRequiredField),

    body('nit', 'NIT is not required')
        .optional()
        .custom(notRequiredField),

    body('isActive', 'isActive is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

//----------------- Validaciones Categoria -----------------


export const CategoryRegisterV = [
    body('name', 'Category name cannot be empty')
        .notEmpty()
        .isLength({ min: 3, max: 20 }).withMessage('Category name must be between 3 and 20 characters')
        .toLowerCase()
        .custom(existCategory),
    
    body('description', 'Category description cannot be empty')
        .notEmpty()
        .isLength({min:10, max:100}).withMessage('Category description must be between 10 and 100 characters'),
    
    body('isActive', 'isActive is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),
    validateErrors
]

export const CategoryUpdateV = [
    body('name', 'Category name cannot be empty')
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage('Category name must be between 3 and 20 characters')
        .toLowerCase()
        .custom(existCategory),
    
    body('description', 'Category description cannot be empty')
        .optional()
        .isLength({min:3, max:100}).withMessage('Category description must be between 10 and 100 characters'),

    body('isActive', 'isActive is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),
    validateErrorsWithoutFiles

]
export const softDeleteCategoryV = [
     body('name', 'Category name is not required')
        .optional()
        .custom(notRequiredField),
    
    body('description', 'Category description is not required')
        .optional()
        .custom(notRequiredField),
    
    body('isActive', 'isActive is not  required')
        .optional() 
        .custom(notRequiredField),

     body('deactivationReason', 'Deactivation reason is  required')
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }).withMessage('Deactivation Reason must be between 5 and 500 characters'),

    body('deactivatedAt', 'Deactivated at is  not required')
        .optional()
        .custom(notRequiredField),
        
    validateErrors

]

export const listCategoryByNameV = [
    body('name',' Category name cannot be empty')
    .notEmpty(),

    validateErrors
]

//----------------- Validaciones Proveedores -----------------

export const addProviderV = [
    body('name', 'Provider name cannot be empty')
    .trim()
    .notEmpty()
    .isLength({min: 5, max: 50}).withMessage('Provider name must be between 5 and 50 characters')
    .custom(existProvider),

    body('description', 'Provider description cannot be empty')
    .trim()
    .notEmpty()
    .isLength({min: 10, max: 100}).withMessage('Provider description must be between 10 and 100 characters'),
    
    body('email', 'Provider email cannot be empty')
    .trim()
    .notEmpty()
    .isEmail().withMessage('Invalid email format')
    .custom(existEmail),

    body('typeProduct', 'Provider type product cannot be empty')
    .notEmpty()
    .isLength({min: 3, max: 20}).withMessage('Provider type product must be between 3 and 20 characters'),

    body('phone', 'Provider phone cannot be empty')
    .notEmpty()
    .isLength({min: 8, max: 8}).withMessage('Provider phone must be 8 characters long')
    .custom(existPhone),

    body('legalRepresentative', 'Provider legal representative cannot be empty')
    .notEmpty()
    .isLength({min: 5, max: 50}).withMessage('Provider legal representative must be between 5 and 50 characters'),

    body('isActive', 'isActive is not required')
    .optional() 
    .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
    .optional()
    .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
    .optional()
    .custom(notRequiredField),

    validateErrors
]

export const updateProviderV = [
    body('name', 'Provider name cannot be empty')
    .optional()
    .trim()
    .notEmpty()
    .isLength({min: 5, max: 50}).withMessage('Provider name must be between 5 and 50 characters')
    .custom(existProvider),

    body('description', 'Provider description cannot be empty')
    .optional()
    .trim()
    .notEmpty()
    .isLength({min: 10, max: 100}).withMessage('Provider description must be between 10 and 100 characters'),
    
    body('email', 'Provider email cannot be empty')
    .optional()
    .trim()
    .notEmpty()
    .isEmail().withMessage('Invalid email format')
    .custom(existEmail),

    body('typeProduct', 'Provider type product cannot be empty')
    .optional()
    .notEmpty()
    .isLength({min: 3, max: 20}).withMessage('Provider type product must be between 3 and 20 characters'),

    body('phone', 'Provider phone cannot be empty')
    .optional()
    .trim()
    .notEmpty()
    .isLength({min: 8, max: 8}).withMessage('Provider phone must be 8 characters long')
    .custom(existPhone),

    body('legalRepresentative', 'Provider legal representative cannot be empty')
    .optional()
    .trim()
    .notEmpty()
    .isLength({min: 5, max: 50}).withMessage('Provider legal representative must be between 5 and 50 characters'),

    body('isActive', 'isActive is not required')
    .optional() 
    .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
    .optional()
    .custom(notRequiredField),
    
    body('deactivatedAt', 'Deactivated at is not required')
    .optional()
    .custom(notRequiredField),

    validateErrors
]
export const softDeleteProviderV = [
    body('name', 'Provider name is not required')
    .optional()
    .custom(notRequiredField),

    body('description', 'Provider description is not required')
    .optional()
    .custom(notRequiredField),
    
    body('email', 'Provider email  is not required')
    .optional()
    .custom(notRequiredField),

    body('typeProduct', 'Provider type product  is not required')
    .optional()
    .custom(notRequiredField),

    body('phone', 'Provider phone  is not required')
    .optional()
    .custom(notRequiredField),

    body('legalRepresentative', 'Provider legal representative  is not required')
    .optional()
    .custom(notRequiredField),

    body('isActive', 'isActive is not  required')
        .optional() 
        .custom(notRequiredField),

     body('deactivationReason', 'Deactivation reason is  required')
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }).withMessage('Deactivation Reason must be between 5 and 500 characters'),

    body('deactivatedAt', 'Deactivated at is  not required')
        .optional()
        .custom(notRequiredField),
        
    validateErrors
]
export const listProviderByNameV = [
    body('provider', 'Provider name cannot be empty')
    .notEmpty()
    .isLength({min: 3, max: 50}).withMessage('Provider name must be between 3 and 50 characters'),

    validateErrors
]

//----------------- Validaciones Productos -----------------

export const addProductV = [
    body('name', 'Product name cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('Product name must be between 3 and 30 characters')
        .custom(existProduct),


    body('description', 'Product description cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 10, max: 100 }).withMessage('Product description must be between 10 and 100 characters'),

    body('price', 'Product price cannot be empty')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Product price must be a number')
        .isFloat({gt:  0}).withMessage('Product price must be greater than 0'),

    body('weigth', 'Product weight cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 10 }).withMessage('Product weight must be between 1 and 10 characters'),

    body('provider', 'Provider ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),

    body('category', 'Category ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),
    
    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),
    
    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

export const updatedProductV = [
    body('name', 'Product name cannot be empty')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ min: 3, max: 30 }).withMessage('Product name must be between 3 and 30 characters')
        .custom(existProduct),


    body('description', 'Product description cannot be empty')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ min: 10, max: 100 }).withMessage('Product description must be between 10 and 100 characters'),

    body('price', 'Product price cannot be empty')
        .optional()
        .trim()
        .notEmpty()
        .isNumeric().withMessage('Product price must be a number')
        .isFloat({gt:  0}).withMessage('Product price must be greater than 0'),

    body('weigth', 'Product weight cannot be empty')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 10 }).withMessage('Product weight must be between 1 and 10 characters'),

    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),
    
    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

export const softDeleteProductV = [
    body('name', 'Product name cannot be empty')
         .optional()
         .custom(notRequiredField),

    body('description', 'Product description cannot be empty')
        .optional()
        .custom(notRequiredField),

    body('price', 'Product price cannot be empty')
        .optional()
        .custom(notRequiredField),

    body('weigth', 'Product weight cannot be empty')
        .optional()
        .custom(notRequiredField),

    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .notEmpty()
        .isLength({ min: 10, max: 500 }).withMessage('Deactivation Reason must be between 10 and 500 characters'),

    
    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

//----------------- Validaciones Productos -----------------
export const addCartV = [
    body('productId', 'Product ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),

    body('quantity', 'Quantity is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Quantity must be a number')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

    validateErrors
]

export const updateCartItemV = [
    body('productId', 'Product ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),

    body('quantity', 'Quantity is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Quantity must be a number')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

    validateErrors
]

export const deleteProductCartV = [
    body('productId', 'Product ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),

    validateErrors
]

//----------------- Validaciones Publicaciones -----------------
export const addPostV = [
    
    body('title', 'Title cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 50 }).withMessage('Title must be between 5 and 50 characters'),

    body('description', 'Description cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

    body('address', 'Address cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 75 }).withMessage('Address must be between 5 and 75 characters'),
    
    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

export const updatePostV = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 50 }).withMessage('Title must be between 5 and 50 characters'),

    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty()
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

    body('address', 'Address cannot be empty')
        .optional()
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 75 }).withMessage('Address must be between 5 and 75 characters'),

     body('date', 'Date is not required')
        .optional() 
        .custom(notRequiredField),

     body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]
export const softDeletePostV = [
    body('title', 'Title cannot be empty')
        .optional()
        .custom(notRequiredField),

    body('description', 'Description cannot be empty')
        .optional()
        .custom(notRequiredField),

    body('address', 'Address cannot be empty')
        .optional()
        .custom(notRequiredField),

     body('isActive', 'isActive is not  required')
        .optional() 
        .custom(notRequiredField),

     body('deactivationReason', 'Deactivation reason is  required')
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }).withMessage('Description must be between 5 and 500 characters'),

    body('deactivatedAt', 'Deactivated at is  not required')
        .optional()
        .custom(notRequiredField),
        
    validateErrors
        
]

//----------------- Validaciones Comentario -----------------
export const addCommentV = [
    body('comment', 'Comment cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 75 }).withMessage('Comment must be between 5 and 75 characters'),
      body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),
    validateErrors
]

export const updateCommentV = [
    body('comment', 'Comment cannot be empty')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 75 }).withMessage('Comment must be between 5 and 75 characters'),
      body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),
    validateErrors
]
export const softComentV = [
    body('comment', 'Comment cannot be empty')
        .optional() 
        .custom(notRequiredField),
     body('isActive', 'isActive is not  required')
        .optional() 
        .custom(notRequiredField),
        
    validateErrors
]

//----------------- Validaciones Inventory movement -----------------
export const addInventoryMovementV = [
    body('product', 'Product ID is required')
        .notEmpty()
        .trim()
        .custom(isValidObjectId),

    body('amount', 'amount is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Amount must be a number')
        .isInt({ gt: 0 }).withMessage('Amount must be a positive integer'),

    body('inputType', 'Input Type is required')
        .notEmpty()
        .trim()
        .isIn(['entry', 'exit']).withMessage('Type must be either "Entry" or "Exit"'),
    
    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

export const updateInventoryMovementV = [

     body('product', 'Product ID is required')
        .optional()
        .custom(notRequiredField),

    body('amount', 'amount is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Amount must be a number')
        .isInt({ gt: 0 }).withMessage('Amount must be a positive integer'),

    body('inputType', 'Input Type is required')
        .optional()
        .notEmpty()
        .trim()
        .isIn(['entry', 'exit']).withMessage('Type must be either "Entry" or "Exit"'),

    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .custom(notRequiredField),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]

export const softDeleteInventoryMovementV = [

     body('product', 'Product ID is required')
        .optional()
        .custom(notRequiredField),

    body('amount', 'amount is required')
        .optional()
        .custom(notRequiredField),

    body('inputType', 'Input Type is required')
        .optional()
        .custom(notRequiredField),
        
    body('isActive', 'isActive is not required')
        .optional() 
        .custom(notRequiredField),

    body('deactivationReason', 'Deactivation reason is not required')
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }).withMessage('Description must be between 5 and 500 characters'),

    body('deactivatedAt', 'Deactivated at is not required')
        .optional()
        .custom(notRequiredField),

    validateErrors
]