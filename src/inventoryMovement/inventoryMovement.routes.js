import {Router} from 'express'

import {
    addInventoryMovement,
    updateInventoryMovement,
    deleteInventoryMovement,
    listInventoryMovement,
    listInventoryMovementById

} from './inventoryMovement.controller.js'

import {
    validateJwt
} from '../../middlewares/validate.jwt.js'
import { addInventoryMovementV, updateInventoryMovementV } from '../../middlewares/validators.js'

const api = Router()

api.post('/addInventoryMovement', validateJwt,addInventoryMovementV,  addInventoryMovement)
api.put('/updateInventoryMovement/:id', validateJwt, updateInventoryMovementV, updateInventoryMovement)
api.delete('/deleteInventoryMovement/:id', validateJwt, deleteInventoryMovement)
api.get('/listInventoryMovement', validateJwt, listInventoryMovement)
api.get('/listInventoryMovementById/:id', validateJwt, listInventoryMovementById)
export default api