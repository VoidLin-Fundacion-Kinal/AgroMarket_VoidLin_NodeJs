import React from 'react'
import PropTypes from 'prop-types'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'

export const ProviderTdContent = ({
    id,
    name,
    description,
    email,
    typeProduct,
    phone,
    legalRepresentative,
    logo,
    updateHandlerProvider,
    deleteHandlerProvider
    
}) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90" onClick={updateHandlerProvider}>
     <td className="px-16 py-3">
        <img src={`${logo}`} className="w-16 md:w-32 max-w-full max-h-full" alt="Logo's Provider"/>
     </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {name} 
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {description}
         </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {email}    
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {typeProduct}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {phone}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {legalRepresentative}
        </td>
        <td className="px-6 py-4" onClick={deleteHandlerProvider}>
          <div>
            <Trash2 className='cursor-pointer hover:text-red-500'/>
          </div>     
        </td>
        <td className="px-6 py-4" onClick={updateHandlerProvider}>
          <div>
            <SquarePen className='cursor-pointer hover:text-blue-400'/>
          </div>
      </td>
    </tr>
  )
}

ProviderTdContent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired, 
    typeProduct: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    legalRepresentative: PropTypes.string.isRequired,
    deleteHandlerProvider: PropTypes.func,
    updateHandlerProvider: PropTypes.func
}