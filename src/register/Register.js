import React,{useState} from 'react'
import axios from 'axios'
import "./Register.css"
import { useNavigate } from 'react-router-dom'


const Register=()=> {
    const navigate = useNavigate();

    const goToLogin=()=>{
        navigate("/login");
    }

    // yaha saara data user me store ho jayega jo bhi update hua hai fill karne ke baad
    const [user, setUser] = useState({

        name: "",
        email: "",
        password: "",
        reEnterPassword: ""

    }

    )
   
// same as case of login ==> refer login component
const handleChange = e=>{
   
    const {name, value}=e.target
    setUser({
        ...user,
        [name]:value
    })
}


//yaha jab onchange event ho rha tab register function call ho rha,
// is funtion me saara data post ho rha jo bhi fill kiya gya hai,
// but kuch conditions ke saath
//post karne ke liye axios ka use kiya gya hai
const register=()=>{
    const {name,email,password,reEnterPassword}=user
    if(name && email && password && (password===reEnterPassword)){
        
        axios.post("http://localhost:9002/register",user)
        .then(res=> console.log(res))
    }
    else{
        alert("invalid input")
    }

    navigate("/login")

    
    
}



    return (
        console.log("User",user),
        <div className='whole'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>

            <form>

                <div className="form-outline mb-4">
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" name="name" value={user.name} onChange={handleChange}/>
                    <label className="form-label" for="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" name="email" value={user.email} onChange={handleChange}/>
                    <label className="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" name="password" value={user.password} onChange={handleChange}/>
                    <label className="form-label" for="form3Example4cg">Password</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange}/>
                    <label className="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>



                <div class="d-flex justify-content-center">
                    <button type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={register}>Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    class="fw-bold text-body" onClick={()=>goToLogin()}><u>Login here</u></a></p>

            </form>

        </div>

    )
}


export default Register