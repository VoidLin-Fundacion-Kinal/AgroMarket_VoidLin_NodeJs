import React from 'react'
import PropTypes from 'prop-types'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'

export const UserTdContent = ({
    id,
    username,
    name,
    surname,
    phone,
    address,
    email,
    role,
    profilePhoto,
    cui,
    nit,
    deleteHandleUser,
    updateHandleUser
}) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
        <td className="p-4">
            <img src={`${profilePhoto}`} className="w-16 md:w-32 max-w-full max-h-full rounded-3xl" alt="Profile Photo"/>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {username}
        </td >
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {name}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {email}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {surname}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {phone}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {address}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {email}      
        </td>
        <td className={` px-6 py-4 font-semibold  dark:text-white ${role === "ADMINPLATAFORM" ? "text-green-800" : "text-blue-700"}`}>
            {role}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {cui}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {nit}
        </td>
        <td className="px-6 py-4">
          <div onClick={deleteHandleUser}>
            <Trash2 className='cursor-pointer hover:text-red-500'/>
          </div>     
        </td>
    </tr>
  )
}


UserTdContent.propTypes = {
    id:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    surname:PropTypes.string.isRequired,
    phone:PropTypes.string.isRequired,
    address:PropTypes.string.isRequired,
    email:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
    role:PropTypes.string.isRequired,
    profilePhoto:PropTypes.string,
    cui:PropTypes.string.isRequired,
    nit:PropTypes.string.isRequired,
    deleteHandleUser: PropTypes.func,
    updateHandleUser:PropTypes.func
}