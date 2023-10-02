const refExp=require('express')
const refMysql = require("mysql2")
const bodyParser = require("body-parser")

const hodRouter=refExp.Router()

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

hodRouter.get('',async(req,res)=>{
    console.log("Welcome HOD to the dashboard")
})

//HoD is receiving the proposal for approval (status = 0)
//HoD is receiving the completion report for approval (status = 3)
hodRouter.get('/hodGet',async(req,res)=>{
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

//HoD is approving the proposal (status = 1)
//HoD is approving the completion report (status = 4)
hodRouter.put('/hodApprove',async(req,res)=>{
    const {proposal_hod,approval_status,sno} = req.body
    const sql="update data_ecr set proposal_hod=?,approval_status=? where sno=?"
    db.query(sql,[proposal_hod,approval_status,sno],(err,result)=>{
        if(err){
            res.status(500).json({"error": err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({message:"No product found"})
            return
        }
        res.status(200).json({message:`Proposal ${sno} approved by HoD`})
    })
})


module.exports=hodRouter