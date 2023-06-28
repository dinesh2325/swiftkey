import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import { motion } from "framer-motion"
import { blue, yellow } from '@mui/material/colors';

const Homepage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  }

  const goToRegister = () => {
    navigate("/register");
  }

  const goTotest = () => {
    navigate("/test");
  }
  return (

    <>


      {/* <h1 className='bg-purple-400 '>Hello This is homepage</h1> */}

<div className=" bg-gradient-to-br from-blue-900 to-purple-500 h-screen">

<div className='flex space-x-12 justify-end  rounded-lg  p-6 mb-9 mr-9'>
          <button class="bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-4 rounded " onClick={() => goToRegister()}>register</button>
          <button class="bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-4 rounded " onClick={() => goToLogin()}>Login</button>
      </div>
 <div className=" ml-12 mr-12 rounded-lg  p-6 mt-36">
 <div className=" flex flex-col justify-center items-center ">
   <div className="flex flex-col items-center">
    <p className="flex justify-center text-[120px] ">Swift Key </p>
  </div>
  <div className="flex flex-col items-center ">
    <p className="flex justify-center text-3xl"> Enhance your typing speed... </p>
  </div>    
  <div className="flex flex-col items-center mt-9 mb-8">
          <Button variant="contained" color="success" className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-4 rounded-3xl" onClick={() => goTotest()}>Continue as a Guest</Button>
   </div>
</div>
      </div>
      </div>
      {/* <div class="flex">
  <div class="ml-auto my-6">
  
    
  </div>
</div> */}
    </>
  )
}

export default Homepage