import { uploadProviderImages } from "../../utils/multer.js" 
import { addProvider, deleteProvider, listProvider, listProviderById, listProviderByName, updateProvider, updateProviderLogo } from "./provider.controller.js" 
import { Router } from "express" 
import {validateJwt} from './../../middlewares/validate.jwt.js'
import { addProviderV, listProviderByNameV, updateProviderV } from "../../middlewares/validators.js"

const api = Router()

api.post('/addProvider', validateJwt, uploadProviderImages, addProviderV, addProvider)

api.put('/updateProvider/:id', validateJwt, updateProviderV, updateProvider)

api.put('/updateProviderLogo/:id', validateJwt, uploadProviderImages, updateProviderLogo )

api.delete('/deleteProvider/:id', validateJwt, deleteProvider)

api.get('/listProvider', validateJwt, listProvider)

api.get('/listProviderById/:id', validateJwt, listProviderById)

api.get('/listProviderByName', validateJwt, listProviderByNameV, listProviderByName)

export default api