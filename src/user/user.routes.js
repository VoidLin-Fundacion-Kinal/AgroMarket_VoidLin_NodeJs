import {Router} from 'express'

import {
    updateUser,
    updatePassword,
    deleteUser
} from './user.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'

const api = Router()

api.put('/updateUser', validateJwt, updateUser)
api.put('/updatePassword', validateJwt, updatePassword)
api.delete('/deleteUser', validateJwt, deleteUser)

export default api