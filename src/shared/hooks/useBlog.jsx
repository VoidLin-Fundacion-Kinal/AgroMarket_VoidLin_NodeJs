import React, { useEffect, useState } from 'react'
import { deletePostRequest, getPostRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useBlog = () => {

  const [post, setPost] = useState([])

  const getPost = async()=>{
    const postData = await getPostRequest()
        console.log(postData)

        if(postData.error){
            return toast.error(
                postData?.error?.response?.data ||
                'Error to get Carts'
            )
        }

        setPost(postData?.data?.post)
    }

    const deletePost = async(id)=>{
      const postData = await deletePostRequest(id)
        console.log(postData)

        if(postData.error){
            return toast.error(
                postData?.error?.response?.data ||
                'Error to get Carts'
            )
        }
        getPost()
    }
    useEffect(() => {
      getPost()
    }, [])
    
  
  return {
    deletePost,
    getPost,
    allPost:post
  }
}
