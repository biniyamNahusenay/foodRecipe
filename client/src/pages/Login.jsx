import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useCookies} from "react-cookie"

const Login = () => {
  const [userName,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const [_,setCookies] = useCookies(["access_token"])

  const onSubmit = async (e)=>{
     e.preventDefault()
      await axios.post("http://localhost:5000/auth/login",{userName,password})
     .then((response) => {
      setCookies("access_token",response.data.token)
      window.localStorage.setItem("userId",response.data.userId)
       navigate("/")
    })
    .catch((error) => {
      console.log("failed response" + error.response);
    });
  }
  return (
    <div className='container'>
     <h1>Login Form</h1>
     <form onSubmit={onSubmit}>
       <label htmlFor="userName">Username:</label>
       <input
           onChange={(e)=>setUserName(e.target.value)}
           type="text" id="userName" name="userName" required/>

       <label htmlFor="password">Password:</label>
       <input 
       onChange={(e)=>setPassword(e.target.value)} 
       type="password" id="password" name="password" required/>
       
       <button type="submit">Login</button>
     </form>
    </div>
  )
}

export default Login
