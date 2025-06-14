import {Router} from 'express'

import {
    addComment,
    updateComment,
    deleteComment
} from './comment.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'
import { addCommentV, updateCommentV } from '../../middlewares/validators.js'

const api = Router()

api.post('/addComment/:id', validateJwt, addCommentV, addComment)
api.put('/updateComment/:id', validateJwt, updateCommentV, updateComment)
api.put('/deleteComment/:commentId', validateJwt, deleteComment)

export default api
