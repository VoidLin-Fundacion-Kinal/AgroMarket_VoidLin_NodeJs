import React, { useState, useEffect } from 'react'
import { addProductRequest, deleteProductRequest, getProductsRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useProducts = () => {

    const [products, setProducts] = useState(null)

    const getProducts = async()=>{
        
        const productsData = await getProductsRequest()
        console.log(productsData)

        if(productsData.error){
            return toast.error(
                productsData?.error?.response?.data ||
                'Error to get products'
            )
        }

        setProducts(productsData?.data?.products)      
    }

    const addProduct = async(
      name,
      description,
      price,
      weigth,
      image,
      stock,
      provider,
      category
    )=>{
      const data={
        name,
        description,
        price,
        weigth,
        image,
        stock,
        provider,
        category
      }

      
      const productAdd = await addProductRequest(data)

      if(productAdd.error){
            return toast.error(
                productAdd?.error?.response?.data ||
                'Error to add product'
            )
        }

        getProducts()
    }

    const deleteProduct = async(id)=>{

      const productDelete = await deleteProductRequest(id)
      if(productDelete.error){
            return toast.error(
                productDelete?.error?.response?.data ||
                'Error to add product'
            )
        }

        getProducts()

    }

    const updateProduct = async(id,data)=>{

    }

    useEffect(() => {
      getProducts()
    }, [])
    

  return {
    getProducts,
    addProduct,
    deleteProduct,
    isFetching: !products,
    allProducts: products
  }
}
