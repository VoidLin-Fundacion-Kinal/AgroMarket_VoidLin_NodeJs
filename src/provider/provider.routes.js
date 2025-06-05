import { Router } from "express";
import { deleteProvider, 
    getAllProviders, 
    getProviderById, 
    getProviderByName, 
    saveProvider, 
    updateProvider} from "./provider.controller";

const api = Router()

api.post('addProvider', saveProvider)

api.get('getProvider',getAllProviders)
api.get('getProvider/:provider',getProviderByName)
api.get('getProvider/:id',getProviderById)

api.put('updateProvider/:id',updateProvider)

api.delete('deleteProvider/:id',deleteProvider)

export default api