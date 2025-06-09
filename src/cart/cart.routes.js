import {Router} from 'express'
import {
    addCart,
    deleteProductCart,
    listCart,
    listCartById,
    listCartUserById,
    updateCartItem,
    clearCart
} from './cart.controller.js'
import {
    validateJwt
} from '../../middlewares/validate.jwt.js'

import {
    addCartV,
    deleteProductCartV,
    updateCartItemV
} from '../../middlewares/validators.js'

const api = Router()


api.post('/addCart', validateJwt, addCartV, addCart)
api.get('/listCartUserById', validateJwt, listCartUserById)
api.get('/listCart', validateJwt, listCart)
api.get('/listCartById/:cartId', validateJwt, listCartById)
api.post('/updateCartItem', validateJwt, updateCartItemV, updateCartItem)
api.post('/deleteProductCart', validateJwt, deleteProductCartV, deleteProductCart)
api.get('/clearCart', validateJwt, clearCart)

export default api
