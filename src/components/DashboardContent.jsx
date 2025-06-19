

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from '@/components/ui/provider'

export const DashboardContent = () => {
  return (
    <div className="relative h-screen  overflow-x-hidden">
      <div className="relative w-full h-screen overflow-x-hidden flex justify-center items-start pt-[10%]">
    
        <Outlet/>
    
      </div>
    </div>
  )
}