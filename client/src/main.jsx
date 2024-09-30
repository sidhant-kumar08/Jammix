import { useContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import Home from './components/Home.jsx'
import Share from './components/Share.jsx'
import AuthProvider, { AuthContext } from './context/AuthContext.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LandingPage from './components/LandingPage.jsx'
import { inject } from '@vercel/analytics';

inject();



const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'login',
        element : <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'home',
        element: <AuthenticatedRoute element={<Home />} />
      },
      {
        path: 'share',
        element: <Share />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
