import React from 'react'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'
import PropTypes from 'prop-types'

export const CategoryTdContent = ({ 
    id,
    name,
    description,
    deleteHandleCategory,
    updateHandleCategory
}) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {name}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {description}
        </td>
        <td className="px-6 py-4">
          <div onClick={deleteHandleCategory}>
            <Trash2 className='cursor-pointer hover:text-red-500'/>
          </div>     
        </td>
        <td className="px-6 py-4">
          <div onClick={updateHandleCategory}>
            <SquarePen className='cursor-pointer hover:text-blue-400'/>
          </div>
        </td>
    </tr>
  )
}

CategoryTdContent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteHandleCategory: PropTypes.func,
    updateHandleCategory: PropTypes.func
}


