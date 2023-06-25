import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [Userdata, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002/getAllUser')
      .then(response => {
        
        setData(response.data);
        console.log(Userdata);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  console.log(Userdata)

//   return (

//     <div>
//         User data

//         {Userdata.map((data)=>{
//             return (
//             <div>{data.name}</div>
//             )
//         })}
//     </div>
//   )






}

export default Profile;

