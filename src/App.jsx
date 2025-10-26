
import React from "react";
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Sidenavbar from "./User/Sidenavbar";
// import Home from './Pages/Home';
// import Education from './Pages/Education';
// import Aadharinfo from './Pages/Aadharinfo';
// import SignUp from "./SignUp"
// import VideoPlayer from "./VideoPlayer"
// import Register from ".Admin/Register"
// import Project from "./Project";
// import DashBoard from "./facultydb/DashBoard";
import Register from "./Admin/Register";
 import Project from "./Project";
import Admin from "./Admin/Admin";
// import Profile from "./Admin/Profile";
// import Attendance from "./Admin/Attendance";
// import BatchManagement from "./Admin/BatchManagement";
// import ADashboard from "./Admin/ADashboard";
import './index.css';
import './style.css';
import ADashboard from "./Admin/ADashboard";


function App() {
  // const location = useLocation();

  // useEffect(() => {
  //   const path = location.pathname;

  //   if (path === '/admin') {
  //     document.title = 'Login';
  //   } else if (path === '/register') {
  //     document.title = 'Register';
  //   } else if(path==='/ADashboard'){
  //     document.title = 'DashBoard';
  //   }
  //   else if(path==='/profile'){
  //     document.title = 'Profile';
  //   }else if(path=='/batch'){
  //     document.title='BatchManagement'
  //   }
  
  // }, [location]);

  return (
    <>
      <div>
       {/* <main className='w-[100%] min-h-screen flex'>
          <Register/>
      <aside className='w-1/5 mt-17 bg-indigo-600 overflow-hidden'>
        <Sidenavbar />
      </aside>

      <section className='w-4/5'>
        <Routes>
          <Route path='/' element={<DashBoard/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/education-details' element={<Education />} />
          <Route path='/aadhar-info' element={<Aadharinfo />} />
        </Routes>
      </section>

    </main> */}

      {/* <SignUp/> */}
      {/* <VideoPlayer/> */}
      {/* <Register/> */}
      <Admin/>
      {/* <ADashboard/> */}
      {/* <Project/> */}
      {/* <Routes>
      {/* Admin Dashboard parent route */}
      {/* <Route path="/admin" element={<ADashboard />}> */}
        {/* These are children that render inside <Outlet /> */}
        {/* <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="batch" element={<BatchManagement />} />
      </Route>
    </Routes>  */}
        </div>
       </>
  )
}

export default App
