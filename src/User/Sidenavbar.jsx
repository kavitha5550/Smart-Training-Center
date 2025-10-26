import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { User,LayoutDashboard } from "lucide-react";
import logo from '../Logo/GC.png';


const Sidenavbar = () => {
 
  return (
    <div>
      <nav className='bg-gray-200 shadow-md p-2 w-[100%]  flex justify-between'>
      <img src={logo} className='w-15  ml-10' alt="" />
      <div className='p-2'>
 </div>
    </nav>
    <div className='min-h-screen flex'>
      <aside className='bg-indigo-800 text-white gap-2 w-64'>
        <h2 className="text-2xl p-3 font-bold tracking-wide mb-6">Faculty Panel</h2> 
<NavLink 
to='faculty/dashboard'
    className={({isActive})=>`flex justify-end gap-2 items-center ml-25 mt-10 px-4 text-xl  p-3 rounded-l-full hover:bg-white hover:text-indigo-800
    ${isActive?'bg-indigo-800':''}`
    }

    >
<User size={18} /> Profile
    </NavLink>
    <NavLink 
to='staffprofile'
    className={({isActive})=>`flex justify-end gap-2 items-center ml-25 mt-10 px-4 text-xl  p-3 rounded-l-full hover:bg-white hover:text-indigo-800
    ${isActive?'bg-indigo-800':''}`
    }

    >
<LayoutDashboard size={18}  />Batches
    </NavLink>
      </aside>
   <main className="flex-1  overflow-hidden p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
   
    </div>

  )
}

export default Sidenavbar