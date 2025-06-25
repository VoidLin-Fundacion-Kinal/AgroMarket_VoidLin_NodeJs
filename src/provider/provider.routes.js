import { uploadProviderImages } from "../../utils/multer.js" 
import { 
           addProvider, 
           listProvider, 
           listProviderById, 
           listProviderByName, 
           listProviderActive,
           updateProvider, 
           updateProviderLogo, 
           softDeleteProvider,
           revertSoftDeleteProvider
        } from "./provider.controller.js" 

import { Router } from "express" 
import {validateJwt, isAdmin} from './../../middlewares/validate.jwt.js'
import { addProviderV, listProviderByNameV, updateProviderV, softDeleteProviderV } from "../../middlewares/validators.js"

const api = Router()

api.post('/addProvider', validateJwt, isAdmin,  uploadProviderImages, addProviderV, addProvider)

api.put('/updateProvider/:id', validateJwt, isAdmin, updateProviderV, updateProvider)

api.put('/updateProviderLogo/:id', validateJwt, uploadProviderImages, updateProviderLogo )

api.put('/softDeleteProvider/:id', validateJwt, isAdmin,  softDeleteProviderV, softDeleteProvider)

api.get('/listProvider', validateJwt,isAdmin, listProvider)

api.get('/listProviderActive', validateJwt, isAdmin, listProviderActive)

api.get('/listProviderById/:id', validateJwt, isAdmin, listProviderById)

api.get('/listProviderByName', validateJwt, isAdmin, listProviderByNameV, listProviderByName)

api.post('/revertSoftDeleteProvider', validateJwt, revertSoftDeleteProvider)

export default api