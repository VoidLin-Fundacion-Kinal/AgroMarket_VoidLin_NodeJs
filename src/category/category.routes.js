import {Router} from 'express'
import {
    addCategory,
    listCategory,
    deleteCategory,
    updateCategory,
    listCategoryById,
    listCategoryByName
} from './category.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'
import { CategoryRegisterV, CategoryUpdateV, listCategoryByNameV } from '../../middlewares/validators.js'



const api = Router()

api.post('/addCategory', validateJwt, CategoryRegisterV, addCategory)
api.get('/listCategory', validateJwt, listCategory)
api.delete('/deleteCategory/:id', validateJwt, deleteCategory)
api.put('/updateCategory/:id', validateJwt, CategoryUpdateV, updateCategory)
api.get('/listCategoryById/:id', validateJwt, listCategoryById)
api.get('/listCategoryByName', validateJwt, listCategoryByNameV, listCategoryByName)

export default api
