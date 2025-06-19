import React, { useEffect, useState } from 'react'
import { getInvoiceByIdRequest, getInvoicesRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useInvoices = () => {
    
    const [invoices, setInvoices] = useState([])

    const getInvoices = async()=>{

        const invoicesData = await getInvoicesRequest()
        console.log(invoicesData)

        if(invoicesData.error){
            return toast.error(
                invoicesData?.error?.response?.data ||
                'Error to get invoices'
            )
        }

        setInvoices(invoicesData?.data?.bills)
    }

    const getInvoiceById = async(id)=>{

        const invoicesData = await getInvoiceByIdRequest(id)

        if(invoicesData.error){
            return toast.error(
                invoicesData?.error?.response?.data ||
                'Error to get invoice'
            )
        }

        getInvoices()
    }

    useEffect(() => {
      getInvoices()
    }, [])
    
    return {
    getInvoices,
    getInvoiceById,
    isFetching: !invoices,
    allInvoices: invoices
  }
}
