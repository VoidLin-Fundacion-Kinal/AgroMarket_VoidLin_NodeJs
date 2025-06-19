import { useEffect, useState } from "react"
import React from 'react'
import { addProviderRequest, deleteProviderRequest, getProvidersRequest } from "../../../services/api"
import toast from 'react-hot-toast'

export const useProviders = () => {
    const [providers, setProviders] = useState([])
 
    const getProviders = async()=>{

        const providersData = await getProvidersRequest()
        console.log(providersData)

        if(providersData.error){
            return toast.error(
                providersData?.error?.response?.data ||
                'Error to get Providers'
            )
        }

        setProviders(providersData?.data?.Provider)
      
    }

    const addProvider = async(
        name, 
        description, 
        email, 
        typeProduct, 
        phone,
        legalRepresentative,
        providerLogo
         )=>{
        const data = {
            name,
            description,
            email,
            typeProduct,
            phone,
            legalRepresentative,
            providerLogo
        }

       const providerAdd = await addProviderRequest(data) 

       if(providerAdd.error){
            return toast.error(
                providerAdd?.error?.response?.data ||
                'Error to post Providers'
            )
        }

        getProviders()
    }

    const deleteProvider = async(id)=>{
        
        const providerDelete = await deleteProviderRequest(id)

        if(providerDelete.error){
            return toast.error(
                providerDelete?.error?.response?.data ||
                'Error to delete Providers'
            )
        }

        getProviders()
    }

    const updateProvider = async(id, data)=>{

    }

    useEffect(() => {

        getProviders()

    }, [])

  return {
    getProviders,
    addProvider,
    deleteProvider,
    isFetching: !providers,
    allProviders: providers
  }
}
