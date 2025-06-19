import React, { useEffect, useState } from 'react'
import { deleteCartRequest, getCartsRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useCart = () => {

    const [cart, setCart] = useState([])

    const getCarts = async()=>{

        const cartData = await getCartsRequest()
        console.log(cartData)

        if(cartData.error){
            return toast.error(
                cartData?.error?.response?.data ||
                'Error to get Carts'
            )
        }

        setCart(cartData?.data?.carts)
    }

    const deleteCarts = async(id)=>{
      const cartData = await deleteCartRequest(id)
        console.log(cartData)

        if(cartData.error){
            return toast.error(
                cartData?.error?.response?.data ||
                'Error to get Carts'
            )
        }
        getCarts  ()
    }
    

    useEffect(() => {
      getCarts()
    }, [])
    
  return {
    deleteCarts,
    getCarts,
    isFetching:!cart,
    allCarts: cart
  }
}
