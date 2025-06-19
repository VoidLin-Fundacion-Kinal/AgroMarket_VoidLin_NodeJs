import React, { useState } from 'react'
import { useCart } from '../../shared/hooks/useCart'
import { CartContent } from './CartContent'
import { DeleteAlert } from '../DeleteAlert'


export const Cart = () => {


  const {allCarts, deleteCarts} = useCart()
  const [deletes, setDeletes] = useState(false)
  const [openItems, setOpenItems] = useState(false)
  const [items, setItems] = useState([])
  const [id, setid] = useState(null)

  const handleOpenDelete = ()=>{
    setDeletes(!deletes)
  }
  
  const handleDelete =()=>{
    deleteCarts(id)
    setDeletes(!deletes)
  }

  const handleItems = ()=>{
      setOpenItems(!openItems)
      console.log(comments)
    }

  return (
    <>
    <div className="  relative overflow-x-auto shadow-md sm:rounded-lg">
        
    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
        <thead className="  text-gray-800  uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
                <th  className="px-6 py-3 ">
                    User
                </th>
                <th  className="px-6 py-3">
                    Items
                </th>
                <th  className="px-6 py-3">
                    Total
                </th>
                <th  className="px-6 py-3">
                    Status
                </th>
                <th className='px-6 py-3'>
                    Created At
                </th>
                <th className="px-6 py-4">
                  <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
              allCarts.map((cart)=>(
                <CartContent
                  key={cart._id}
                  id={cart._id}
                  user={cart.user.email}
                  total={cart.total}
                  status={cart.status}
                  createdAt={cart.createdAt}
                  deleteHandlerCart={()=>{handleOpenDelete();setid(cart._id)}}
                  items={()=>{setItems(cart.items);handleItems()}}
                />
              ))
            }
        </tbody>
    </table>
    {
          deletes &&
          <DeleteAlert
            open={deletes}
            handleOpen={handleOpenDelete}
            func={handleDelete}
          />
     }
     {openItems && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-70" onClick={handleItems}></div>

    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-3xl shadow-xl z-10 overflow-y-auto max-h-[80vh]">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
        onClick={handleItems}
        >
         ✕
        </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Productos del Registro
          </h2>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <strong>Cantidad:</strong> {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

</div>
    </>
  )
}
