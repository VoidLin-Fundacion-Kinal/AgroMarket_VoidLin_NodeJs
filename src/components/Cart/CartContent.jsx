import React from 'react'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'
import PropTypes from 'prop-types'

export const CartContent = (
  {id,
  user,
  total,
  status,
  createdAt,
  deleteHandlerCart,
  items
  
}
) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {user}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           <a className='cursor-pointer font-medium hover:text-blue-600 hover:underline dark:text-white' onClick={items}>View More . . .</a>
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {total}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {status}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {new Date(createdAt).toLocaleString()}
       </td>
       <td className="px-6 py-4">
        <div onClick={deleteHandlerCart}>
          <Trash2 className='cursor-pointer hover:text-red-500'/>
        </div>     
      </td>
   </tr>
  )
}

CartContent.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.func,
  items: PropTypes.func
}