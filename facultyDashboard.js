const refExp = require("express")
const refMysql = require("mysql2")
const bodyParser = require("body-parser")

const facultyRouter = refExp.Router()

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

facultyRouter.get('',async(req,res)=>{
    console.log("Welcome faculty to the dashboard")
})

//Faculty is submitting the event proposal form (status = 0)
facultyRouter.post('/facultyPost',async(req,res)=>{
    const {sno,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,event_photo_1,event_photo_2,event_po,proposal_date,proposal_hod,proposal_principal,completion_date,completion_hod,completion_principal,pdf,approval_status,event_budget,event_coordinator,coordinator_phno,coordinator_designation,event_duration,event_os,event_time,event_description,acdyr_id,event_budget_utilized,dept_id,sem_id} = req.body
    const sql="insert into data_ecr values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sql,[sno,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,event_photo_1,event_photo_2,event_po,proposal_date,proposal_hod,proposal_principal,completion_date,completion_hod,completion_principal,pdf,approval_status,event_budget,event_coordinator,coordinator_phno,coordinator_designation,event_duration,event_os,event_time,event_description,acdyr_id,event_budget_utilized,dept_id,sem_id],(err,result)=>{
        if (err) {
            res.status(500).json({ "error": err.message })
        }
        else{
            res.status(200).json({ "message": result.affectedRows });
        }
    })
})

//Faculty is viewing the proposal and the report
facultyRouter.get('/facultyGet',async(req,res)=>{
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

//Faculty is submitting the ECR report after proposal approval from Principal (status = 3)
facultyRouter.put('/facultyUpdate',async(req,res)=>{
    const {sno,event_photo_1,event_photo_2,event_po,completion_date,completion_hod,completion_principal,approval_status,event_duration,event_os,event_time,event_description,event_budget_utilized} = req.body
    const sql="update data_ecr set event_photo_1=?,event_photo_2=?,event_po=?,completion_date=?,completion_hod=?,completion_principal=?,approval_status=?,event_duration=?,event_os=?,event_time=?,event_description=?,event_budget_utilized=? where sno=?"
    db.query(sql,[event_photo_1,event_photo_2,event_po,completion_date,completion_hod,completion_principal,approval_status,event_duration,event_os,event_time,event_description,event_budget_utilized,sno],(err,result)=>{
        if(err){
            res.status(500).json({"error": err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({message:"No product found"})
            return
        }
        res.status(200).json({message:`${sno} has updated`})
    })
})

//To delete
facultyRouter.delete('/facultyDelete/:sno',async(req,res)=>{
    const sno=parseInt(req.params.sno)
    const sql="delete from data_ecr where sno=?"
    db.query(sql,[sno],(err,result)=>{
        if(err){
            res.status(500).json({error:"Error while deleting the record"})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({message:"Product not found to delete"})
            return
        }
        res.status(200).json({message:`${sno} has removed from stock`})
    })
})

module.exports = facultyRouter