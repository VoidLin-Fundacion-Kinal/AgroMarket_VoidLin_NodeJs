import {Router} from 'express'

import {
    addInventoryMovement,
    updateInventoryMovement,
    softDeleteInventoryMovement,
    listInventoryMovement,
    listInventoryMovementActive,
    listInventoryMovementById

} from './inventoryMovement.controller.js'

import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'
import { 
            addInventoryMovementV, 
            updateInventoryMovementV,
            softDeleteInventoryMovementV
         } from '../../middlewares/validators.js'

const api = Router()

api.post('/addInventoryMovement', validateJwt, isAdmin, addInventoryMovementV,  addInventoryMovement)
api.put('/updateInventoryMovement/:id', validateJwt, isAdmin, updateInventoryMovementV, updateInventoryMovement)
api.put('/softDeleteInventoryMovement/:id', validateJwt, isAdmin, softDeleteInventoryMovementV, softDeleteInventoryMovement)
api.get('/listInventoryMovement', validateJwt, isAdmin, listInventoryMovement)
api.get('/listInventoryMovementActive', validateJwt, isAdmin, listInventoryMovementActive)
api.get('/listInventoryMovementById/:id', validateJwt, isAdmin, listInventoryMovementById)
export default api