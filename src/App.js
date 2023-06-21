import React from 'react'

import Homepage from './homepage/Homepage'
import Register from './register/Register'
import Login from './login/Login'
import Type_logic from './Components/Type_logic'
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";

function App() {
  
  return (
   
  

<>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Homepage/>  }></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
   </Routes>
   </BrowserRouter>
   

   </>
  )
}
export default App