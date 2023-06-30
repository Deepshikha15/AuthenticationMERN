import axios from 'axios';
import React,{useState} from 'react'
import {useNavigate, Link } from 'react-router-dom';


export default function Register() {
    const history=useNavigate();
    const [name, setName]= useState();
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    async function handleClick(e){
        e.preventDefault();
        
        try{
            await axios.post('http://localhost:4000/register',{
                name,email,password
            }).then(res=>{
                if(res.data=="exist"){
                    alert("user already exist")
                }else if(res.data=="notexist"){
                    history("/home")
                }
            }).catch(e=>{
                alert("wrong details");
                console.log(e)
            } )
        }catch{
            console.log(e)
        }
    }

  return (
    <>
    <h1>Register</h1>
    <form action="POST">
            <input type="name" id="name" onChange={(e)=>setName(e.target.value)}/>
            <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" onClick={handleClick}/>
        </form>
        <br/>
        <p>OR</p>
        <br/>
        <Link to="/login">Login yourself</Link>
    </>
  )
}
