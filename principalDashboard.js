const refExp=require('express')
const refMysql = require("mysql2")
const bodyParser = require("body-parser")

const principalRouter=refExp.Router()

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

principalRouter.get('',async(req,res)=>{
    console.log("Welcome The Principal to the dashboard")
})

//Principal is receiving the proposal for approval (status = 1)
//Principal is receiving the completion report for approval (status = 4)
principalRouter.get('/principalGet',async(req,res)=>{
    const sql="select * from data_ecr"
    db.query(sql,(err,records)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.json(201).json({"message":"no records found"})
            return
        }
        res.status(200).json({records})
    })
})

//Principal is approving the proposal (status = 2)
//Principal is approving the completion report for approval (status = 5)
principalRouter.put('/principalApprove',async(req,res)=>{
    const {proposal_principal,approval_status,sno} = req.body
    const sql="update data_ecr set proposal_hod=?,approval_status=? where sno=?"
    db.query(sql,[proposal_principal,approval_status,sno],(err,result)=>{
        if(err){
            res.status(500).json({"error": err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({message:"No product found"})
            return
        }
        res.status(200).json({message:`${sno} has approved by Principal`})
    })
})


module.exports=principalRouter