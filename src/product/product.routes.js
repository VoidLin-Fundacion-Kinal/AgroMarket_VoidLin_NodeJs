import {Router} from 'express'

import { 
            addProduct, 
            listProductActive, 
            listProduct,
            listProductById, 
            listProductsAZ, 
            listProductsPriceHigh, 
            listProductsPriceLow, 
            listProductsProvider, 
            listProductsZA, 
            softDeleteProduct,
            updateProduct, 
            updateProductImage 
        } from './product.controller.js'

import {
        validateJwt,
        isAdmin
    } from './../../middlewares/validate.jwt.js'

import {    
            addProductV, 
            updatedProductV,
            softDeleteProductV
        } from './../../middlewares/validators.js'

import { uploadSingleProductImage } from '../../utils/multer.js'

const api = Router()

api.post('/addProduct', validateJwt, uploadSingleProductImage, addProductV, addProduct)
api.put('/updateProduct/:id', validateJwt, updatedProductV, updateProduct)
api.put('/updateProductImage/:id', validateJwt, uploadSingleProductImage, updateProductImage)
api.put('/softDeleteProduct/:id', validateJwt, isAdmin, softDeleteProductV, softDeleteProduct)
api.get('/listProductActive', validateJwt, listProductActive)
api.get('/listProduct', validateJwt, isAdmin, listProduct)
api.get('/listProductsById/:id', validateJwt, listProductById)
api.get('/listProductsAZ', validateJwt, listProductsAZ)
api.get('/listProductsZA', validateJwt, listProductsZA)
api.get('/listProductsPriceHigh', validateJwt, listProductsPriceHigh)
api.get('/listProductsPriceLow', validateJwt, listProductsPriceLow)
api.get('/listProductsProvider/:id', validateJwt, listProductsProvider)




export default api