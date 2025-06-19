import React, { useState } from 'react'
import { useCategory } from '../../shared/hooks/useCategory'
import { CategoryTdContent } from './CategoryTdContent'
import { CategoryForm } from './CategoryForm'
import { DeleteAlert } from '../DeleteAlert'


export const Categories = () => {

  const {allCategories, getCategories, isFetching,deleteCategory} = useCategory()
  const [isOpen, setIsOpen] = useState(false)
  const [deletes, setDeletes] = useState(false)
  const [id, setid] = useState(null)


  if(isFetching){
        <p>Cargando</p>
        {console.log('Cargando')}
        
    }

    const handleDelete =()=>{
    deleteCategory(id)
    setDeletes(!deletes)
  }

  const handleOpenDelete = ()=>{
    setDeletes(!deletes)
  }
  const toggleForm = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <>
    <div className="  relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className=' flex m-4 justify-end'>
        <button className='bg-green-700/90 text-white font-semibold p-2.5  rounded-lg hover:bg-green-900 cursor-pointer' onClick={toggleForm}>
          Agregar
        </button>
      </div>
    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
        <thead className="  text-gray-800  uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
                <th  className="px-6 py-4 ">
                    Name
                </th>
                <th  className="px-6 py-4">
                    Description
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

              allCategories.map((category)=>(
                <CategoryTdContent
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  description={category.description}
                  deleteHandleCategory={()=>{handleOpenDelete();setid(category._id)}}
                />
              ))

            }
        </tbody>
    </table>
    {isOpen &&
      <CategoryForm
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
