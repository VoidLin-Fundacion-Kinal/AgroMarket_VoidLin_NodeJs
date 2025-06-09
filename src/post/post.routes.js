import {Router} from "express" 
import {
    addPost,
    deletePost,
    listPost,
    listPostById,
    updatePost
} from './post.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'

import {
    addPostV,
    updatePostV
} from './../../middlewares/validators.js'

import { uploadPostImages } from "../../utils/multer.js" 

const api = Router()

api.post('/addPost', validateJwt, uploadPostImages, addPostV, addPost)
api.put('/updatePost/:id', validateJwt, updatePostV, updatePost)
api.delete('/deletePost/:id', validateJwt, deletePost)
api.get('/listPost', validateJwt, listPost)
api.get('/listPostById/:id', validateJwt, listPostById)

export default api
