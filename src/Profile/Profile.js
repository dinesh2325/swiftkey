import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Profile() {
  const { userid } = useParams();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    maxwpm: "",
    wpm: []
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

  const last = profile.wpm.length > 0 ? profile.wpm[profile.wpm.length - 1].Correct : null;


  return (
    <> 
      <div className='flex items-center justify-center mt-11'>
            <div className="bg-gray-100 rounded-lg shadow p-6 mr-10">
              <div className="text-8xl ">
                <AccountBoxIcon style={{ fontSize: '12rem' }} />
              </div>
              <p className="text-lg font-semibold text-center">  <h1>UserName: {profile.name}</h1></p>
              <p className="text-lg font-semibold text-center">  <h1>Email: {profile.email}</h1></p>
            </div>

            <div className=" rounded-lg shadow p-6 ml-10">
            <div className="bg-green-600 rounded-lg shadow p-6  mb-5">
              <p className="text-lg font-semibold from-neutral-900">MaxScore: {profile.maxwpm} wpm</p>
            </div>
            <div className="bg-green-600 rounded-lg shadow p-6 mt-5">
              <p className="text-lg font-semibold from-neutral-900">LastScore: {last} wpm</p>
            </div>
            </div>
          </div>

      <div className='flex items-center justify-center ml-14 mr-14 mt-5'>
        <div>

        

          <div className="flex flex-wrap mt-12 ml-9 mr-9 ">
            {profile.wpm &&
              profile.wpm.map((data, index) => (
                <div className=" p-1 w-1/4 " key={index}>
                  <div className="bg-gray-100 rounded-lg shadow p-6">
                    <p className="text-lg font-semibold text-center">Day {index} : {data.Correct} wpm</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  )

}

export default Profile;

