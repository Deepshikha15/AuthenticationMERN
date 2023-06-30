import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate,Link} from 'react-router-dom';

export default function Login() {
    const history=useNavigate();
    const [name, setName]= useState();
    // const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    async function handleClick(e){
        e.preventDefault();
        
        try{

            await axios.post("http://localhost:4000/login",{
                name,password
            })
            .then(res=>{
                console.log(res.data)
                if(res.data=="exist"){
                    alert("User have not sign up")
                }
                else if(res.data=="notexist"){
                    history("/home")
                    
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);

            })

        }
        catch(e){
            console.log(e);

        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form action="POST">
            <input type="name" id="name" onChange={(e)=>setName(e.target.value)}/>
            {/* <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/> */}
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" onClick={handleClick}/>
        </form>
        <br/>
        <p>OR</p>
        <br/>
        <Link to="/register">Register yourself</Link>

      
    </div>
  )
}
