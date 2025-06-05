import { Router } from "express";
import { getAllProviders, 
    getProviderById, 
    getProviderByName, 
    saveProvider } from "./provider.controller";

const api = Router()

api.post('addProvider', saveProvider)
api.get('getProvider',getAllProviders)
api.get('getProvider/:provider',getProviderByName)
api.get('getProvider/:id',getProviderById)

export default api