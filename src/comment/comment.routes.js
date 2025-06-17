import {Router} from 'express'

import {
    addComment,
    updateComment,
    deleteComment
} from './comment.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'
import { addCommentV, updateCommentV, softComentV } from '../../middlewares/validators.js'

const api = Router()

api.post('/addComment/:id', validateJwt, addCommentV, addComment)
api.put('/updateComment/:commentId', validateJwt, updateCommentV, updateComment)
api.put('/deleteComment/:commentId', validateJwt, softComentV, deleteComment)

export default api
