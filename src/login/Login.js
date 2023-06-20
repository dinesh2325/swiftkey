import React,{useState} from 'react'
import "./Login.css"

const Login=()=> {

  const [user, setUser] = useState({
email: "",
 password: "",
    }

)


const handleChange = e=>{

const {name, value}=e.target
setUser({
    ...user,
    [name]:value
})
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
      <button>Register</button>
      <button>Sign in</button>
    </div>
  </form>
</div>
  )
}


export default Login