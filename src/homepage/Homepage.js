import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Homepage=()=> {
  const navigate = useNavigate();

  const goToLogin=()=>{
    navigate("/login");
}

const goToRegister=()=>{
  navigate("/register");
}
  return (
   
   
    
    <>
     
    
      <h1 className='bg-purple-400 '>Hello This is homepage</h1>

      <div className='space-x-8'>
      <Button variant="contained" color="success" className='mx-10 flex' onClick={()=>goToRegister()}>Register</Button>
      <Button variant="contained" color="success" className='mx-10 flex' onClick={()=>goToLogin()}>Login</Button>
      <Button variant="contained" color="success" className='mx-10 flex'>Continue as a Guest</Button>
      
      </div>
      
      
      
    
    </>
  )
}

export default Homepage