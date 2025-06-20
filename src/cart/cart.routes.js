import {Router} from 'express'
import {
    addCart,
    softDeleteCart,
    softDeleteCartA,
    deleteProductCart,
    listCart,
    listCartById,
    listCartUserById,
    updateCartItem,
    clearCart,
    listCartUserByIdNew
} from './cart.controller.js'
import {
        isAdmin,
        validateJwt
} from '../../middlewares/validate.jwt.js'

import {
    addCartV,
    deleteProductCartV,
    updateCartItemV
} from '../../middlewares/validators.js'

const api = Router()


api.post('/addCart', validateJwt, addCartV, addCart)
api.put('/softDeleteCart/:id', validateJwt, softDeleteCart)
api.put('/softDeleteCartA/:id', validateJwt, isAdmin, softDeleteCartA)
api.get('/listCartUserById', validateJwt, listCartUserById)
api.get('/listCart', validateJwt, isAdmin, listCart)
api.get('/listCartById/:cartId', validateJwt, listCartById)
api.post('/updateCartItem', validateJwt, updateCartItemV, updateCartItem)
api.post('/deleteProductCart', validateJwt, deleteProductCartV, deleteProductCart)
api.get('/clearCart', validateJwt, clearCart)
api.get('/listCartUserByIdNew', validateJwt, listCartUserByIdNew)

export default api
