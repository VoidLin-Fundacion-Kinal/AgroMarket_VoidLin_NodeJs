import React ,{useState}from 'react'
import { useUsers } from '../../shared/hooks/useUsers'
import { UserTdContent } from './UserTdContent'

export const Users = () => {

  const {allUsers,getUsers,isFetching} = useUsers()
  const [isOpen, setIsOpen] = useState(null)

   if(isFetching){
    {
      <p>Cargando</p>
      console.log('caragando')
    }
  }

  const toggleForm = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <>
    <div className="  relative overflow-x-auto shadow-md sm:rounded-lg">
      
    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
        <thead className="  text-gray-800  uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
                <th  className="px-16 py-3">
                    <span className=" text-gray-500 dark:text-gray-900">Profile Photo</span>
                </th>
                <th  className="px-6 py-3 ">
                    Username
                </th>
                <th  className="px-6 py-3">
                    Name
                </th>
                <th  className="px-6 py-3">
                    Email
                </th>
                <th  className="px-6 py-3">
                    Surname
                </th>
                <th className='px-6 py-3'>
                    Phone
                </th>
                <th className='px-6 py-3'>
                    Adress
                </th>
                <th className='px-6 py-3'>
                    Email
                </th>
                <th className='px-6 py-3'>
                    Role
                </th>
                <th className='px-6 py-3'>
                    CUI
                </th>
                <th className='px-6 py-3'>
                    NIT
                </th>
                <th className="px-6 py-4">
                  <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {

              allUsers.map((user)=>(
                <UserTdContent
                  key={user._id}
                  id={user._id}
                  username={user.username}
                  name={user.name}
                  email={user.email}
                  address={user.address}
                  phone={user.phone}
                  password={user.password}
                  role={user.role}
                  profilePhoto={user.profilePhoto}
                  cui={user.personalData.cui}
                  nit={user.personalData.nit}
                  surname={user.surname}
                />
              )
              )

            }
        </tbody>
    </table>
  </div>
    </>
  )
}
