import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { CgMenuRightAlt } from "react-icons/cg";

function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false)

  const navigate = useNavigate()
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  const handleLogout = async () => {
    try {

      const response = await axios.post('https://jammix.onrender.com/auth/logout',{},{
        withCredentials: true
      });
      setIsAuthenticated(false)
      console.log(response)
      navigate('/login')
      
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav className='md:px-6 md:py-2 flex justify-between items-center shadow-inner'>
        <div>
            <Link to='/'><img width={150} height={200} className='bg-transparent mix-blend-multiply' src="./logo.png" alt="logo" /></Link>
        </div>

    { isAuthenticated ? <button onClick={handleLogout} className='px-3  items-center gap-2 py-1 border border-zinc-500 hover:bg-black hover:text-white transition ease-linear duration-100 hidden md:flex rounded-2xl'>Logout <IoLogOutOutline /></button> :
        <div className='hidden gap-4 md:flex'>
            <button className='px-5 py-1 border border-zinc-500 hover:bg-black hover:text-white transition ease-linear duration-100  rounded-2xl'><Link to='/login'>Login</Link></button>
            <button className='px-5 py-1 border border-zinc-500 hover:bg-black hover:text-white transition ease-linear duration-100  rounded-2xl'><Link to='/register'>Signup</Link></button>
        </div>
    }




      <div className={`md:hidden sm:flex transition ease-linear duration-100 mr-4 ${mobileMenu ? '-rotate-180' : ''}`}>
        <button onClick={()=> setMobileMenu(!mobileMenu)}><CgMenuRightAlt /></button>
      </div>

      <div className={`${mobileMenu ? 'flex' : 'hidden'} transition ease-linear duration-100  h-[800px] w-screen bg-white absolute top-16 right-0 z-50`}>

        <div className='text-center w-full py-6 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
          <ul className='flex flex-col gap-14 font-semibold items-center'>
            <Link className='' to='/home' onClick={()=> setMobileMenu(false)}><li>Home</li></Link>
            {
              isAuthenticated ? <button className='' onClick={handleLogout}><li>Logout</li></button> : <div className='flex flex-col gap-14'>
                <Link className='' to='/login' onClick={()=> setMobileMenu(false)}><li>Login</li></Link>
                <Link className='' to='/register' onClick={()=> setMobileMenu(false)}><li>Register</li></Link>
              </div>
            }
            <Link className='' to='/share' onClick={()=> setMobileMenu(false)}><li>Share Playlist</li></Link>
          </ul>
        </div>

      </div>

      </nav>
    </>
  )
}

export default Navbar
