import {body} from 'express-validator'
import {existUsername, existEmail, existCui, existNit, notRequiredField, existPhone} from './../utils/db.validators.js'
import { validateErrors } from './validate.error.js'

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
        .isLength({min:8, max:8})
        .custom(existPhone),
    
    body('address','Address cannot be empty')
        .notEmpty(),

    body('email', 'Email cannot be empty')
        .notEmpty()
        .custom(existEmail),

    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min:8})
        .withMessage('Password need min 8 chacarcters'),

    body('cui', 'Cui cannot be empty')
        .notEmpty()
        .isLength({min: 13, max:13})
        .custom(existCui),
    
    body('nit','Nit cannot be empty')
        .notEmpty()
        .isLength({min: 5, max:10})
        .custom(existNit),
    
    validateErrors


]
