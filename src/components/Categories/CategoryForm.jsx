import React, { useEffect, useState } from 'react'
import { useCategory } from '../../shared/hooks/useCategory'


export const CategoryForm = ({ 
    handleModal
}) => {
    
    const form = {
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        description: {
            value: '',
            isValid: false,
            showError: false
        }
    }

    const { addCategory} = useCategory()
    const [formData, setFormData] = useState(form)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)
        addCategory(
            formData.name.value,
            formData.description.value,
        )
        handleModal()
    }

    const handleValueChange = (value, field) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black opacity-80' onClick={handleModal}></div>

            <div className='relative border bg-gray-500/90 rounded-lg max-w-[100vh] w-full mx-4 p-8 mb-1.5 overflow-auto max-h-[80vh]'>
                <button
                    onClick={handleModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className='bg-gray-600 rounded-2xl'>
                    <h1 className='text-4xl font-bold p-5 m-10 text-white'>Agregar Proveedor</h1>
                    <form onSubmit={handleSubmit} className='p-4 grid grid-flow-col grid-rows-3 gap-10 items bg-white m-8 rounded-2xl'>
                        <div>
                            <label className="bg-sky-700 text-center w h-11 w-full px-2 p-1 text-white inline-block rounded-lg m-2">
                                Name
                            </label>
                        </div>
                        <div>
                            <label className="bg-sky-700 h-11 w-full text-center px-2 p-1 text-white inline-block rounded-lg m-2">
                                Description
                            </label>
                        </div>
                        <div className='p-2 flex justify-between'>
                            <button className='bg-green-600 p-2 w-1/2 m-0.5 rounded-xl text-white hover:bg-green-900' type='submit'>Agregar</button>
                            <button className='bg-red-500 p-2 w-1/2 m-0.5 rounded-xl text-white hover:bg-red-800' onClick={handleModal}>Cancelar</button>
                        </div>
                        <div>
                            <input
                                onChange={(e) => handleValueChange(e.target.value, e.target.name)}
                                name='name'
                                value={formData.name.value}
                                placeholder='Provider'
                                className="text-black px-4 py-1 h-10 w-80 border-gray-600 rounded-sm border-2"
                            />
                        </div>
                        <div>
                            <input
                                onChange={(e) => handleValueChange(e.target.value, e.target.name)}
                                name='description'
                                value={formData.description.value}
                                placeholder='Description'
                                className="text-black px-4 py-1 h-10 w-80 border-gray-600 rounded-sm border-2"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
