import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};



function Login() {


  useEffect(() => {
    // Check if the accessToken cookie is present
    const token = getCookie("token");
    if (token) {
      setIsAuthenticated(true);
      navigate('/home')
       // Set authenticated state if cookie is found
    } else {
      setIsAuthenticated(false)
    }
  }, []);

  const {setIsAuthenticated} = useContext(AuthContext)

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    function handleEyeClick(){
        setShowPassword(!showPassword);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/auth/login',formData, {
          withCredentials : true
        })
        if(response.status == 200){
          setIsAuthenticated(true)
          navigate('/home')
        }
    }

    function handleInputChange (e){
        const {name, value} = e.target;

        setFormData({...formData, 
            [name] : value
        })
    }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>


      <div className="min-h-screen justify-center flex  overflow-hidden">
        <form onSubmit={handleSubmit}>
        <div className="bg-transparent md:bg-white px-6 md:w-96 py-16 md:shadow rounded-3xl">
          <div className="justify-center flex text-black text-3xl font-[700] mb-8">
            <h1>Log in</h1>
          </div>

          <div className="flex flex-col gap-5">
            <input
              type="email"
              className="border shadow-sm border-zinc-300 rounded-md p-2"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="border shadow-sm w-full border-zinc-300 rounded-md p-2"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
              />
              <button onClick={handleEyeClick}><img
                width="20"
                height="20"
                src={showPassword ? "./eye.png" : "./closeEye.png"}
                alt="eye"
                className="absolute inset-y-3 right-2 flex items-center"
              /></button>
            </div>
          </div>

          <div className="w-4/5 text-nowrap">
            <p className="mt-4 text-zinc-600 text-xs">
              By logging in, I agree to the{" "}
              <span className="text-zinc-700 tracking-tighter font-bold">
                <a href="/">Terms and Conditions</a>
              </span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button className="px-6 py-2 rounded-2xl hover:bg-zinc-800 transition ease-linear duration-100 w-full mb-4 bg-black text-white font-[poppins] font-medium">
              Log in
            </button>
            Don't have an account? 
            <Link to="/register" className="text-blue-500 font-medium text-sm m-1">
              Register
            </Link>
          </div>
        </div>
        </form>
      </div>
    </>
  );
}

export default Login;
