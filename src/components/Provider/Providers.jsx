import React, { useState } from 'react'
import { useProviders } from '../../shared/hooks/useProviders'
import { ProviderTdContent } from './ProviderTdContent'
import { ProviderForm } from './ProviderForm'
import { DeleteAlert } from '../DeleteAlert'


export const Providers = () => {

  const {getProviders, allProviders, isFetching, deleteProvider} = useProviders()
  const [isOpen, setIsOpen] = useState(false)
  const [deletes, setDeletes] = useState(false)
  const [id, setid] = useState(null)

  if(isFetching){
    {
      <p>Cargando</p>
      console.log('caragando')
    }
  }

  const handleDelete =()=>{
    deleteProvider(id)
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
                <th  className="px-16 py-3">
                    <span className=" text-gray-500 dark:text-gray-900">Logo</span>
                </th>
                <th  className="px-6 py-3 ">
                    Name
                </th>
                <th  className="px-6 py-3">
                    Description
                </th>
                <th  className="px-6 py-3">
                    Email
                </th>
                <th  className="px-6 py-3">
                    Type Of Product
                </th>
                <th className='px-6 py-3'>
                  Number Phone
                </th>
                <th className='px-6 py-3'>
                  Legal Representative
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

              allProviders.map((provider)=>(
                  <ProviderTdContent
                    key={provider._id}
                    id={provider._id}
                    name={provider.name}
                    description={provider.description}
                    email={provider.email}
                    typeProduct={provider.typeProduct}
                    phone={provider.phone}
                    logo={provider.logo}
                    legalRepresentative={provider.legalRepresentative}
                    deleteHandlerProvider={()=>{handleOpenDelete();setid(provider._id)}}
                  />
              ))
   
            }

        </tbody>
    </table>
    {
      isOpen &&
      <ProviderForm
      handleModal={toggleForm}
      getProviders={getProviders}
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
