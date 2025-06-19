import React from 'react'
import PropTypes from 'prop-types'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'


export const InventoryContent = ({
    id,
    product,
    date,
    amount,
    inputType,
    isActive,
    deleteHandleInventory,
    updateHandleInventory
}) => {

  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">     
           <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               {product}
           </td>
           <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               {new Date(date).toLocaleString()}
           </td>
           <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               {amount}
           </td>
           <td className={`px-6 py-4 font-semibold  dark:text-white ${inputType === 'entry' ? 'text-green-800' : 'text-red-700'}`}>
               {new String(inputType).toUpperCase()}
           </td>
           <td className={`px-6 py-4 font-semibold  dark:text-white ${new String(isActive) == 'true' ? "text-green-800": "text-red-600"}`}>
               {new String(isActive).toUpperCase()}
           </td>
           <td className="px-6 py-4">
            <div onClick={deleteHandleInventory}> 
              <Trash2 className='cursor-pointer hover:text-red-500' />
            </div>     
          </td>
          <td className="px-6 py-4">
            <div>
              <SquarePen className='cursor-pointer hover:text-blue-400' onClick={updateHandleInventory}/>
            </div>
          </td>
    </tr>
  )
}

InventoryContent.propTypes={
    id: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    amount: PropTypes.number.isRequired,
    inputType: PropTypes.string.isRequired,
    isActive: PropTypes.string.isRequired,
    deleteHandleInventory: PropTypes.func,
    updateHandleInventory:PropTypes.func
}