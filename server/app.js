require('dotenv').config()

const express =require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')

const User=require('./Models/User')
const dnsRecords=require('./Models/dnsRecord')
const createUser=require('./Routes/createUser')
const loginUser=require('./Routes/loginUser')
const getUser=require('./Routes/getUser')
const createDNSRecord=require('./Routes/creatednsrecord')
const getDnsRecord=require('./Routes/getDnsRecord')
const updateDNSrecord=require('./Routes/editdnsrecord')
const deletednsrecord=require('./Routes/deleteDnsRecord')
const hostedzone=require('./Routes/hostedzone')

const app=express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/createuser',createUser)
app.use('/loginuser',loginUser)
app.use('/getuser',getUser)
app.use('/creatednsrecord',createDNSRecord)
app.use('/getdnsrecord',getDnsRecord)
app.use('/editdnsrecord',updateDNSrecord)
app.use('/deletednsrecord',deletednsrecord)
app.use('/hostedzone',hostedzone)

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('DB Connected'))
    .catch((error)=>console.log(error))
    console.log(`server running at http://localhost:${process.env.PORT}`)
})