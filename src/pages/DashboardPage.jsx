import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { DashboardContent } from '../components/DashboardContent'

export const DashboardPage = () => {
  return (
    
    <div>
        <Navbar/>
        <div>
            <DashboardContent/>
        </div>
    </div>
    
  )
}
