import {Router} from 'express'
import {
    addCategory,
    listCategory,
    updateCategory,
    listCategoryById,
    listCategoryByName,
    listAllCategory,
    softDeleteCategory
} from './category.controller.js'

import {
    validateJwt,
    isAdmin
} from './../../middlewares/validate.jwt.js'
import { 
            CategoryRegisterV, 
            CategoryUpdateV, 
            listCategoryByNameV,
            softDeleteCategoryV
        } from '../../middlewares/validators.js'



const api = Router()

api.post('/addCategory',validateJwt, isAdmin, CategoryRegisterV, addCategory)
api.get('/listCategory',validateJwt, isAdmin, listCategory)
api.put('/updateCategory/:id',validateJwt, isAdmin, CategoryUpdateV, updateCategory)
api.put('/softDeleteCategory/:id',validateJwt, isAdmin, softDeleteCategoryV, softDeleteCategory)
api.get('/listCategoryById/:id',validateJwt, listCategoryById)
api.get('/listAllCategory', validateJwt, isAdmin, listAllCategory)
api.get('/listCategoryByName', validateJwt, listCategoryByNameV, listCategoryByName)

export default api
