import React, { useEffect, useState } from 'react'
import { addCategoryRequest, deleteCategoryRequest, getCategoriesRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useCategory = () => {

    const [categories, setCategories] = useState([])

    const getCategories = async()=>{

        const categoryData = await getCategoriesRequest()
        console.log(categoryData)

        if(categoryData.error){
            return toast.error(
                categoryData?.error?.response?.data ||
                'Error to get Categories'
            )
        }

        setCategories(categoryData?.data?.category)
    }

    const addCategory = async(name,description)=>{

        const data={
            name,
            description
        }

        const categoryData = await addCategoryRequest(data)
        console.log(categoryData)

        if(categoryData.error){
            return toast.error(
                categoryData?.error?.response?.data ||
                'Error to get Categories'
            )
        } 
        getCategories()
    }

    const deleteCategory = async(id)=>{

        const categoryData = await deleteCategoryRequest(id)
        console.log(categoryData)

        if(categoryData.error){
            return toast.error(
                categoryData?.error?.response?.data ||
                'Error to get Categories'
            )
        }
        getCategories()
    }

    useEffect(() => {
      
        getCategories()

    }, [])
    

  return {
    deleteCategory,
    addCategory,
    getCategories,
    isFetching: !categories,
    allCategories: categories
  }
}
