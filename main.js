const express=require('express')
const refMysql = require("mysql2")
const bodyParser=require('body-parser')

const faculty=require('./facultyDashboard')
const hod=require('./hodDashboard')
const principal=require('./principalDashboard')

const app=express()

const db=refMysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "port":3306,
    "database":"mec_project"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/faculty',faculty)
app.use('/hod',hod)
app.use('/principal',principal)

app.listen(9090,()=>{
    console.log("App is running")
})