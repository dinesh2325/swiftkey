import React,{useState} from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login=()=> {

  const navigate = useNavigate();

  const goToRegister=()=>{
    navigate("/register");
}

  const [user, setUser] = useState({
   email: "",
   password: "",
    }
)


// when the value is entered int he boxes, event is fired, this stores the data in their respective field
const handleChange = e=>{

const {name, value}=e.target
setUser({
    ...user,
    [name]:value
})
}

// when login button is pressed ths function is called which post the data to server
// and move to home page

async function login(e){
  e.preventDefault();
  try{
    axios.post("http://localhost:9002/login", user)
      .then(res=>{
          if(res.data.message=="Login successfull"){
              navigate("/test/"+ res.data.user);
          }
          else if(res.data.message=="Password didn't match"){
              alert("Password didn't match")
          }
          else{
            alert("user not found")
          }
         
      })
      .catch(e=>{
        alert("User not found")
      })

  }
  catch(e){
    alert(e)
      console.log(e);

  }

}



  return (
    console.log(user),

    <div className="login-form">
  <form>
    <h1>Login</h1>
    <div className="content">
      <div className="input-field">
        <input type="email" placeholder="Email" name='email' value={user.email} onChange={handleChange} />
      </div>
      <div className="input-field">
        <input type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} />
      </div>
      <a href="#" className="link">Forgot Your Password?</a>
    </div>
    <div className="action">
      <button onClick={()=> goToRegister()}>Register</button>
      <button onClick={login}>Log in</button>
    </div>
  </form>
</div>
  )
}


export default Login