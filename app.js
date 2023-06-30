const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const jwt= require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const bcryptjs = require("bcryptjs")
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(cors())

async function hashPass(password){
    const res= await bcryptjs.hash(password,10)
    return res
}
async function compare(userPass,hashPass){
    const res= await bcryptjs.hash(userPass,hashPass)
    return res
}

app.get('/login',cors(),(req,res)=>{
    if(req.cookies.availableCookie){
        const verify=jwt.verify(req.cookies.availableCookie,"qwertyuiopasdfghjklzxcvbnmqwertyuiopiopasdfghjklzxcv" )
        res.render({name:verify.name})
    }
})

app.post("/login",async(req,res)=>{
    const{name,password}=req.body

    try{
        const check=await collection.findOne({name:name})
        const passCheck= await compare(password, check.password)

        if(check && passCheck){
            res.cookie("availableCookie",check.token,{
                maxAge:600000,
                httpOnly:true
            })
            res.json("notexist")
        }
        else{
            res.json("exist")
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.post('/register',async(req,res)=>{
    const token= jwt.sign({name:req.body.name},"qwertyuiopasdfghjklzxcvbnmqwertyuiopiopasdfghjklzxcv")
    res.cookie("availableCookie",token,{
        maxAge:600000,
        httpOnly:true
    })
    const {name, email,password}= req.body
    const data={
        name:name,
        email:email,
        password: await hashPass(password),
        token:token
    }
    try{
        const check= await collection.findOne({name:name})
        if(check){
            res.json("exist")
        }else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }catch(e){
        res.json("fail")
    }  
})

app.listen(4000,()=>{
    console.log('port running')
})