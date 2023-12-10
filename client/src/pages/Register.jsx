import React, { useState } from 'react'
import axios from "axios"
import { useSnackbar } from 'notistack';

const Register = () => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const Submit = async (e)=>{
        e.preventDefault();
            await axios.post("http://localhost:5000/auth/register",{userName,password})
            .then(() => {
                enqueueSnackbar('registered success', { variant: 'success' });
                setUserName("")
                setPassword("")
              })
              .catch((error) => {
                console.log("failed response" + error.response);
              });
       
    }
  return (
    <div className='container'>
     <h1>Registration Form</h1>
     <form onSubmit={Submit}>
       <label htmlFor="userName">Username:</label>
       <input onChange={(e)=>setUserName(e.target.value)}
        value={userName}
        type="text" id="username" name="userName" required/>

       <label htmlFor="password">Password:</label>
       <input onChange={(e)=>setPassword(e.target.value)} 
        value={password}
       type="password" id="password" name="password" required/>

       <button type="submit">Register</button>
     </form>
    </div>
  )
}

export default Register
