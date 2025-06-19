import React from 'react'
import PropTypes from 'prop-types'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'

export const ProductTdContent = ({
    id,
    name,
    description,
    price,
    weigth,
    image,
    stock,
    provider,
    category,
    deleteHandlerProduct,
    updateHandlerProduct
}) => {
  return (
        <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
            <td className='px-16 py-3'>
                <img src={`${image}`} alt="Image Product" className="w-16 md:w-32 max-w-full max-h-full" />
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                {name}
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                {description}
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                Q{price}.00
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                {weigth}
            </td>
            <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${stock <= 10 ? 'text-red-700' : 'text-black'}`}>
                {stock}
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                {provider}
            </td>
            <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                {category}
            </td>   
            <td className="px-6 py-4">
            <div onClick={deleteHandlerProduct}>
                <Trash2 className='cursor-pointer hover:text-red-500'/>
            </div>     
            </td>
            <td className="px-6 py-4">
            <div onClick={updateHandlerProduct}>
                <SquarePen className='cursor-pointer hover:text-blue-400'/>
            </div>
        </td>
        </tr>
    
  )
}

ProductTdContent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    weigth: PropTypes.string.isRequired,
    image: PropTypes.string,
    stock: PropTypes.number,
    provider: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    updateHandlerProduct: PropTypes.func,
    deleteHandlerProduct: PropTypes.func
}

