import React, { useEffect, useState } from 'react'
import { addInventoryMovementRequest, deleteInventoryMovementRequest, getInventoryMovementRequest, updateInventoryMovementRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useInventory = () => {

    const [inventory, setInventory] = useState([])

    const getInventory = async()=>{

        const inventoryData = await getInventoryMovementRequest()
        console.log(inventoryData)
          if(inventoryData.error){
              return toast.error(
                  inventoryData?.error?.response?.data ||
                  'Error to get inventory'
              )
          }

          setInventory(inventoryData?.data?.inventory)
    }

    const addInventory = async(
        product,
        amount,
        inputType
    )=>{

        const data={
            product,
            amount,
            inputType
        }

        const inventoryData = await addInventoryMovementRequest(data)
        
          if(inventoryData.error){
              return toast.error(
                  inventoryData?.error?.response?.data ||
                  'Error to add inventory'
              )
          }

          getInventory()
        
    }

    const deleteInventory = async(id)=>{
        const inventoryData = await deleteInventoryMovementRequest(id)
        
          if(inventoryData.error){
              return toast.error(
                  inventoryData?.error?.response?.data ||
                  'Error to delete inventory'
              )
          }

          getInventory()
    }

    const updateInventory = async(
        id,
        product,
        amount,
        inputType
    )=>{
        const data = {
            product,
            amount,
            inputType
        }

        const inventoryData = await updateInventoryMovementRequest(id,data)
        
          if(inventoryData.error){
              return toast.error(
                  inventoryData?.error?.response?.data ||
                  'Error to update inventory'
              )
          }

          getInventory()

    }

    useEffect(() => {
      getInventory()
    }, [])
    
  return {
    getInventory,
    addInventory,
    deleteInventory,
    isFetching: !inventory,
    allInventories:inventory
  }
}
