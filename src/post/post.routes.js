import {Router} from "express" 
import {
    addPost,
    listPost,
    listPostById,
    listPostsUser,
    listPostActive,
    updatePost,
    softDeletePost
} from './post.controller.js'

import {
    validateJwt,
    isAdmin
} from './../../middlewares/validate.jwt.js'

import {
    addPostV,
    updatePostV,
    softDeletePostV
} from './../../middlewares/validators.js'

import { uploadPostImages } from "../../utils/multer.js" 
import { listCartUserByIdNew } from "../cart/cart.controller.js"

const api = Router()

api.post('/addPost', validateJwt, uploadPostImages, addPostV, addPost)
api.put('/updatePost/:id', validateJwt, updatePostV, updatePost)
api.put('/softDeletePost/:id', validateJwt, isAdmin, softDeletePostV, softDeletePost)
api.get('/listPost', validateJwt, isAdmin, listPost)
api.get('/listPostsUser', validateJwt, listPostsUser)
api.get('/listPostById/:id', validateJwt, listPostById)
api.get('/listPostActive', listPostActive)
api.get('/listCartUserByIdNew', listCartUserByIdNew)

export default api
