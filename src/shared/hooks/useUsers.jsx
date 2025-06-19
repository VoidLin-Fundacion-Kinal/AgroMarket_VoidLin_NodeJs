import React, { useEffect, useState } from 'react'
import { getUsersRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useUsers = () => {
    
    const [users, setUsers] = useState([])

    const getUsers = async()=>{
        
        const usersData = await getUsersRequest()
        console.log(usersData)

        if(usersData.error){
            return toast.error(
                usersData?.error?.response?.data ||
                'Error to get Users'
            )
        }

        setUsers(usersData?.data?.users)
    }

    useEffect(() => {

        getUsers()

    }, [])
    

  return {
    getUsers,
    isFetching: !users,
    allUsers:users
  }
}
