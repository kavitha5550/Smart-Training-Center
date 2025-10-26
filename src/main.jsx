import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Admin/Register.jsx';
import Log from './User/Log.jsx';
import Project from './Project.jsx';
import Admin from './Admin/Admin.jsx'
import ADashboard from './Admin/ADashboard.jsx';
import Attendance from './Pages/attendance/Attendance.jsx';
import AdminLayout from './Pages/AdminLayout.jsx';
import BatchManagement from './Pages/Batchs/BatchManagement.jsx';
import Profile from './Pages/profile/Profile.jsx';
import ForgetPassword from './Admin/ForgetPassword.jsx';
import Student from './Pages/Student.jsx';
import Password from './Admin/Password.jsx';
import { FacultyProvider } from "./Context/FacultyContext";
import AddStudent from './Pages/Batchs/Modify.jsx';
import Sidenavbar from './User/Sidenavbar';
import DashBoard from './facultydb/DashBoard';
import StaffProfile from './facultydb/StaffProfile';
import PersonalDetails from './Pages/profile/PersonalDetails';
import Fbatch from './Pages/facultybatches/Fbatch.jsx'
import NotesShare from './Pages/notes/NotesShare.jsx';
import Questios from './Pages/assesst/Questios.jsx';
import AddQuestions from './Pages/assesst/AddQuestions.jsx'
import StudentQuery from './Pages/StudentQuery/StudentQuery.jsx';
import Modify from './Pages/Batchs/Modify.jsx';
import BatchStudent from './Pages/facultybatches/BatchStudent.jsx';
import './style.css';


 
  
const router=createBrowserRouter([

  {
    path:'/',
    element:<App/>
  },
  {
    path:'register',
    element:<Register/>
  },{
    path:'login',
    element:<Log/>
  },{
    path:'/admin',
    element:<Admin/>
  },{
    path:'/ADashboard',
    element:<ADashboard/>,
     children: [
      { index: true, element: <Profile /> }, 
      {path:'register',element:<Register/>},
      { path: "personaldetails", element: <PersonalDetails /> },
       { path: "profile", element: <Profile /> },
      { path: "password", element: <Password /> },
      { path: "batch", element: <BatchManagement />, 
        
      },{ path:'addstudent',element:<Student/>
        },{
          path:'addstudents',element:<Modify/>
        },{
          path:'fbatch',element:<Fbatch/>
        },{
          path:'notesshare',element:<NotesShare/>
        },{
          path:'questions',element:<Questios/>
        },{
          path:'studentquery',element:<StudentQuery/>
        },{
          path:'mark',element:<Attendance/>
        }
    ],
  },{
    path:'/batchstudents',
    element:<BatchStudent/>
  },{path:'/AddQuestions',
    element:<AddQuestions/>
  },{
    path:'/forgetpassword',
    element:<ForgetPassword/>
  },{
    path:'/password',
    element:<Password/>
  },{
    path:'/sidenavbar',
    element:<Sidenavbar/>,
    children:[
    { index:true,element:<DashBoard/>},
    {path:'faculty/dashboard',element:<DashBoard/>},
    {path:'staffprofile',element:<StaffProfile/>}
    ]
    
  }
  
   
  
  
 
]);


createRoot(document.getElementById('root')).render(
 <FacultyProvider>
<StrictMode>
<RouterProvider router={router} />
 </StrictMode>
  </FacultyProvider>
)
