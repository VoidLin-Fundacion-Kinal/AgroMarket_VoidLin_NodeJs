
import { validationResult } from "express-validator"

export const validateErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Error de validación",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg 
            }))
        });
    }
    next();
};
//Valida si hay campos vacios.
export const validateErrorsWithoutFiles = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(validationResult(req))
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                success: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}