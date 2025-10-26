import React from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, LogIn,Shield} from "lucide-react"

const Project = () => {
  return (
    <div className="min-h-screen  flex-col justify-center items-center bg-black text-white">

      <div className="w-full max-w-md text-center space-y-6">
        <Link
          to="/register"
          className="flex items-center justify-center space-x-2 text-xl font-semibold hover:text-gray-400"
        >
          <UserPlus className="w-6 h-6" />
          <span>REGISTER</span>
        </Link>

        <Link
          to="/login"
          className="flex items-center justify-center space-x-2 text-xl font-semibold hover:text-gray-400"
        >
          <LogIn className="w-6 h-6" />
          <span>LOGIN</span>
        </Link>
         <Link
          to="/admin"
          className="flex items-center justify-center space-x-2 text-xl font-semibold hover:text-gray-400"
        >
          <Shield className="w-6 h-6" />
          <span>ADMIN</span>
        </Link>
      </div>
    </div>
   
  )
}

export default Project