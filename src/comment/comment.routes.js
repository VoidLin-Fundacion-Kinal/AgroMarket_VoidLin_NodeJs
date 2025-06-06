import { Router } from 'express'
import {
    createComment,
    updateComment,
    getAllComents,
    getCommentById,
    getCommnetByPost,
    getCommnetByUser,
    deleteComment
} from './comment.controller.js'

const api = Router()

api.post('/Comment',  createComment)
api.put('/Comment/:id', updateComment)
api.get('/Comment',getAllComents)
api.get('/Comment/:id', getCommentById)
api.get('/Comment/post/:post',getCommnetByPost)
api.get('/Comment/user/:user',getCommnetByUser)
api.delete('/Comment/:id', deleteComment)

export default api 