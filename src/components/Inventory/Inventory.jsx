import React, { useState } from 'react'
import { useInventory } from '../../shared/hooks/useInventory'
import { InventoryContent } from './InventoryContent'
import { InventoryForm } from './InventoryForm'
import { DeleteAlert } from '../DeleteAlert'

export const Inventory = () => {

  const {allInventories,getInventory,isFetching,deleteInventory} = useInventory()
  const [isOpen, setIsOpen] = useState(false)
  const [deletes, setDeletes] = useState(false)
  const [id, setid] = useState(null)


  if(isFetching){
        <p>Cargando</p>
        {console.log('Cargando')}
        
    }


    const toggleForm = ()=>{
    setIsOpen(!isOpen)
  }

  const handleDelete =()=>{
    deleteInventory(id)
    setDeletes(!deletes)
  }

  const handleOpenDelete = ()=>{
    setDeletes(!deletes)
  }
  return (
    <>
    <div className="  relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className=' flex m-4 justify-end'>
        <button className='bg-green-700/90 text-white font-semibold p-2.5  rounded-lg hover:bg-green-900 cursor-pointer'onClick={toggleForm}>
          Agregar
        </button>
      </div>
    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
        <thead className="  text-gray-800  uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
                <th  className="px-6 py-3 ">
                    Product
                </th>
                <th  className="px-6 py-3">
                    Date
                </th>
                <th  className="px-6 py-3">
                    Amount
                </th>
                <th  className="px-6 py-3">
                    Input Type 
                </th>
                <th  className="px-6 py-3">
                    Active
                </th>
                <th className="px-6 py-4">
                  <span className="sr-only">Delete</span>
                </th>
                <th className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
              allInventories.map((inventory)=>(
                <InventoryContent
                  key={inventory._id}
                  id={inventory._id}
                  product={inventory.product.name}
                  date={inventory.date}
                  amount={inventory.amount}
                  inputType={inventory.inputType}
                  isActive={inventory.isActive}
                  deleteHandleInventory={()=>{handleOpenDelete(); setid(inventory._id)}}
                />
              ))
            }
        </tbody>
    </table>
    {
      isOpen &&
      <InventoryForm
        handleModal={toggleForm}
      />
    }
    {
      deletes &&
      <DeleteAlert
        open={deletes}
        handleOpen={handleOpenDelete}
        func={handleDelete}
      />

    }
    
</div>
    </>
  )
}
