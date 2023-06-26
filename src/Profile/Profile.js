import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';

function Profile() {
    const {userid}=useParams();

    const [profile,setProfile]=useState({
      name: "",
      email: "",
      maxwpm:"",
      wpm:[]
    });
    useEffect(() => {    
      axios
        .get(`http://localhost:9002/getProfile/${userid}`)
        .then(response => {
          
       
          setProfile(prevProfile => ({
            ...prevProfile,
            name: response.data.name,
            email: response.data.email,
            maxwpm: response.data.maxwpm,
            wpm: response.data.wpms
          }));
        
        })
        .catch(error => {
          console.log(error);
        });
    }, [userid]);
      
    
      
    
 

  return (

    <div>
        <div>
        <h1>Hello</h1>
       <h1>{profile.name}</h1> 
       <h1>{profile.email}</h1> 
       <h1>{profile.maxwpm}</h1>    

       {profile.wpm && profile.wpm.map((data) => (
        <p>{data.Correct}</p>
      ))} 
    </div>

        

    </div>
  )






}

export default Profile;




