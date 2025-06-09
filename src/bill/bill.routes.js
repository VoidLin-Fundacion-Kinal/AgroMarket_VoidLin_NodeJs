import {Router} from 'express'

import {
    addBill,
    updateBillCancelled,
    getBillsByUserId,
    getBillById,
    getAllBills
} from './bill.controller.js'

import {
    validateJwt
} from './../../middlewares/validate.jwt.js'

const api = Router()

api.get('/addBill', validateJwt, addBill)
api.get('/updateBillCancelled/:billId', validateJwt, updateBillCancelled)
api.get('/getBillsByUserId', validateJwt, getBillsByUserId)
api.get('/getBillById/:billId', validateJwt, getBillById)
api.get('/getAllBills', validateJwt, getAllBills)


export default api 