import {Router} from 'express'

import {
    updateUser,
    updatePassword,
    listUserById,
    softDeleteUser, 
    getAllUser,
    getAllActiveUsers,
    updateUserLogo,
    softDeleteUserByAdmin
} from './user.controller.js'

import {
    validateJwt,
    isAdmin
} from './../../middlewares/validate.jwt.js'

import {
        softDeleteUserV,
        updateUserV,
        updateUserPasswordV
} from './../../middlewares/validators.js'
import {uploadProfilePicture} from '../../utils/multer.js'
const api = Router()

api.put('/updateProfilePhone', validateJwt, uploadProfilePicture, updateUserLogo)
api.put('/updateUser', validateJwt, updateUserV, updateUser)
api.put('/updatePassword', updateUserPasswordV, validateJwt, updatePassword)
api.put('/softDeleteUser', validateJwt, softDeleteUserV, softDeleteUser)
api.get('/getAllUser', validateJwt, isAdmin, getAllUser)
api.get('/getAllActiveUsers', validateJwt, isAdmin, getAllActiveUsers)
api.get('/listUserById', validateJwt, listUserById)
api.put('/softDeleteUserByAdmin/:id', validateJwt, isAdmin, softDeleteUserByAdmin)

export default api