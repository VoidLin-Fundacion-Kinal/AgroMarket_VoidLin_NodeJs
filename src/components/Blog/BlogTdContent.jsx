import React from 'react'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'
import PropTypes from 'prop-types'

export const BlogTdContent = (
    {id,
    image,
    user,
    title,
    description,
    adress,
    date,
    cui,
    nit,
    deleteHandleBlog,
    comments}
) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
     <td className="p-4">
           <img src={image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {user}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {title}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {description}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {adress}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {new Date(date).toLocaleString()}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {cui}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {nit}
       </td>
       <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           <a className='cursor-pointer font-medium hover:text-blue-600 hover:underline dark:text-white' onClick={comments}>Comments . . .</a>
       </td>
       <td className="px-6 py-4">
        <div>
          <Trash2 className='cursor-pointer hover:text-red-500' onClick={deleteHandleBlog}/>
        </div>     
      </td>
   </tr>
  )
}

BlogTdContent.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    adress: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    cui: PropTypes.string.isRequired,
    nit: PropTypes.string.isRequired,
    deleteHandleBlog: PropTypes.func,
    comments: PropTypes.func
}