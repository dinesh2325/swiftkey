import React from 'react'

import Homepage from './homepage/Homepage'
import Register from './register/Register'
import Login from './login/Login'
import Type_logic from './Components/Type_logic'
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import Profile from './Profile/Profile'

function App() {
  
  return (
  
<>
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<Homepage/>  }></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/test' element={<Type_logic/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
   </Routes>
   </BrowserRouter>
   

   </>
  )
}
export default App