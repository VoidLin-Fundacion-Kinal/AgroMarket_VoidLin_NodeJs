import React from 'react'
import { useProducts } from '../../shared/hooks/useProducts'
import { useState } from 'react'
import { ProductTdContent } from './ProductTdContent'
import { ProductForm } from './ProductForm'
import { DeleteAlert } from '../DeleteAlert'

export const Products = () => {

    const {allProducts, isFetching, deleteProduct} = useProducts()
    const [isOpen, setIsOpen] = useState(false)
    const [deletes, setDeletes] = useState(false)
    const [id, setid] = useState(null)
    

    if(isFetching){
        <p>Cargando</p>
        {console.log('Cargando')}
        
    }

    const handleDelete =()=>{
    deleteProduct(id)
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
        <thead className="  text-gray-800  uppercase bg-gray-400/95 dark:bg-gray-700/85 dark:text-gray-300">
            <tr>
                <th  className="px-16 py-3">
                    <span className=" text-gray-500 dark:text-gray-900">Image</span>
                </th>
                <th  className="px-6 py-3 ">
                    Product
                </th>
                <th  className="px-6 py-3">
                    Description
                </th>
                <th  className="px-6 py-3">
                    Price
                </th>
                <th  className="px-6 py-3">
                    Weigth
                </th>
                <th className='px-6 py-3'>
                  Stock
                </th>
                <th className='px-6 py-3'>
                  Provider
                </th>
                <th className='px-6 py-3'>
                  Category
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
                    allProducts?.map((product)=>(
                        <ProductTdContent
                        id={product._id}
                        key={product._id}
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        weigth={product.weigth}
                        stock={product.stock}
                        provider={product.provider.name}
                        category={product.category.name}
                        deleteHandlerProduct={()=>{handleOpenDelete();setid(product._id)}}
                        
                            />
                     ) )
                }
                
            
        </tbody>
    </table>
    {
          isOpen &&
          <ProductForm
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

