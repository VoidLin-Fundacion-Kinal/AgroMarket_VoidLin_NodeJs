import React from 'react'
import { Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'

export const InvoiceContent = ({
  id,
  user,
  total,
  status,
  createdAt,
  deleteHandleInvoice,
  updateHandleInvoice,
  viewCart
}) => {
  return (
    <tr className="bg-gray-200/60 border-b dark:bg-gray-800/75 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {user}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white cursor-pointer" >
          <a className='cursor-pointer font-medium hover:text-blue-600 hover:underline dark:text-white' onClick={viewCart}>View More . . .</a>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          Q{total}.00
      </td>
      <td className={`px-6 py-4 font-semibold  dark:text-white ${status === 'cancelled' ? 'text-red-700' : 'text-green-800'}`}>
          {new String(status).toUpperCase()}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {new Date(createdAt).toLocaleString()}
      </td>
     
  </tr>
  )
}

InvoiceContent.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.any.isRequired,
  deleteHandleInvoice: PropTypes.func,
  updateHandleInvoice: PropTypes.func,
  viewCart:PropTypes.func
}
