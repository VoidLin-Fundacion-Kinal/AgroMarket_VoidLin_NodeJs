import {Router} from 'express'

import {
    updateUser,
    updatePassword,
    listUserById,
    softDeleteUser, 
    getAllUser,
    getAllActiveUsers
} from './user.controller.js'

import {
    validateJwt,
    isAdmin
} from './../../middlewares/validate.jwt.js'

import {
        softDeleteUserV,
        updateUserV,
        updateUserPassword
} from './../../middlewares/validators.js'
const api = Router()

api.put('/updateUser', validateJwt, updateUserV, updateUser)
api.put('/updatePassword', updateUserPassword, validateJwt, updatePassword)
api.put('/softDeleteUser', validateJwt, softDeleteUserV, softDeleteUser)
api.get('/getAllUser', validateJwt, isAdmin, getAllUser)
api.get('/getAllActiveUsers', validateJwt, isAdmin, getAllActiveUsers)
api.get('/listUserById/:id', validateJwt, listUserById)

export default api