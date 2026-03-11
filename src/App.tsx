
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login'
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Home from './Components/Home/Home'
import UsersList from './Components/UsersList/UsersList'
import AddUser from './Components/AddUser/AddUser'
import Profile from './Components/Profile/Profile'
import { ToastContainer } from 'react-toastify'

function App() {
  const routes=createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login/>},
         {path:'login',element:<Login/>},
      ]
    },
  {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
         {index:true,element:<Home/>},
         {path:'home',element:<Home/>},
         {path:'users-list',element:<UsersList/>},
         {path:'add-user',element:<AddUser/>},
         {path:'profile',element:<Profile/>}
      ]
    }

  ])
 

  return (
    <>
     <ToastContainer />
<RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
