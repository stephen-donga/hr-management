const express = require('express');
const parser = require('body-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')


const app = express()

app.use(parser.json());

const connection = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'human_resource_dbsm'
})

 connection.connect(error=>{
     if(!error){
         console.log('Database connected')
     }
     else{
         console.log('Connection error')
     }
 })

 app.get('/users',(req, res)=>{
     connection.query('SELECT * FROM users',(error, results,fields)=>{
            if(error)throw error;
            res.send(results)
     })
 });

 app.post('/users/add',(req, res)=>{

    let sqlCheck = 'SELECT * users WHERE email = ?'
    connection.query(sqlCheck,[req.body.email],(error,results, fields)=>{
        if(results.length > 0){
            res.send('Email already taken')
            return;
        }else{

            let user = {
                 email:req.body.email,
                 user_id:req.body.id,
                 role:req.body.role,
                 password:req.body.password 
            }
    
            let sql = 'INSERT INTO users SET ?'
            connection.query(sql, user, (err, result) => {
                if(err)throw err;
                res.send(result)
            })
        }
    })
 });

 app.delete('/users/delete/:id',(req, res)=>{
     let sql = 'DELETE FROM users WHERE id = ?'
     connection.query(sql,[req.params.id],(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
 })

 app.get('/staff',(req, res)=>{
    connection.query('SELECT * FROM staff_members',(error, results,fields)=>{
           if(error) throw error;
           res.send(results)
    })
});

 app.post('/staff/add',(req, res)=>{

     let firstname =req.body.firstname
     let lastname = req.body.lastname

    let sqlCheck="SELECT * FROM staff_members WHERE last_name = ?"
    connection.query(sqlCheck,[lastname],(err,results,fields)=>{
        if(results.length > 0){
           
                if(results[0].first_name == firstname){

                        res.setHeader('Content-Type','application/json')
                        let failed = {message:'exists'}
                        res.send(JSON.stringify(failed))
                 }else{
                    let user = {
                        first_name:req.body.firstname,
                        last_name:req.body.lastname,
                        position:req.body.position,
                        qualification:req.body.qualification,
                        experience:req.body.experience,
                        date_of_birth:req.body.date,
                        image:req.body.image,
                        onleave:0
                    }
                        let sql = 'INSERT INTO staff_members SET ?'
                        connection.query(sql, user, (err, result) => {
                        if(err)throw err;
                        res.setHeader('Content-Type','application/json')
                        let success= {message:true}
                        res.send(JSON.stringify(success))
                     })
                }

            }else{
                let user = {
                    first_name:req.body.firstname,
                    last_name:req.body.lastname,
                    position:req.body.position,
                    qualification:req.body.qualification,
                    experience:req.body.experience,
                    date_of_birth:req.body.date,
                    image:req.body.image,
                    onleave:0
                }
                let sql = 'INSERT INTO staff_members SET ?'
                connection.query(sql, user, (err, result) => {
                if(err)throw err;
                res.setHeader('Content-Type','application/json')
                let success= {message:true}
                res.send(JSON.stringify(success))
            })
        }
    })
});

app.put('/staff/leave',(req, res)=>{
    let id = req.body.id
    let onleave = 1
    let sql = "UPDATE staff_members SET onleave ='"+onleave+"' WHERE  id ='"+id+"' "
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.put('/staff/leave/cancel',(req, res)=>{
    let id = req.body.id
    let onleave = 0
    let sql = "UPDATE staff_members SET onleave ='"+onleave+"' WHERE  id ='"+id+"' "
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.put('/staff/update',(req, res)=>{
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let position = req.body.position
    let qualification = req.body.qualification
    let experience = req.body.experience
    let date = req.body.date
    let id = req.body.id
  let sql = "UPDATE staff_members SET  first_name ='"+firstname+"', last_name ='"+lastname+"',position ='"+position+"',qualification ='"+qualification+"', experience ='"+experience+"',date_of_birth ='"+date+"' WHERE  id ='"+id+"'"
  connection.query(sql,(err, result) => {
    if(err)throw err;
    res.send(result)
    console.log(result)
})
})

app.delete('/staff/delete/:id',(req, res)=>{

    let sql = 'DELETE FROM staff_members WHERE id=?'
    connection.query(sql,[req.params.id],(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/trainee',(req, res)=>{
    let sql = 'SELECT * FROM staff_members WHERE position = "Intern Developer"'
    connection.query(sql,(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/new',(req, res)=>{
    connection.query('SELECT * FROM new_users',(error, results,fields)=>{
        if(error) throw error;
        res.send(results)
 })
});

app.post('/new/adduser',async(req, res)=>{
    const hashed = await bcrypt.hash(req.body.password, 10)
    try{
        let sqlCheck = 'SELECT * FROM new_users WHERE email =?'
        connection.query(sqlCheck,[req.body.email],(error,results,fields)=>{
            if(results.length > 0){
                res.setHeader('Content-Type','application/json')
                let result = {message:'taken'}
                res.send(JSON.stringify(result))
                return;
            }else{

                let user ={
                    first_name:req.body.firstname,
                    last_name:req.body.lastname,
                    email:req.body.email,
                    role:req.body.role,
                    password:hashed
                }
                let sql = 'INSERT INTO new_users SET ?'
                connection.query(sql, user, (err, result) => {
                    if(err)throw err;
                    res.setHeader('Content-Type','application/json')
                    let success= {message:'loaded'}
                    res.send(JSON.stringify(success))
                    
                })
            }
        })
    }catch(err){
        console.log(err)
    }

});

app.post('/new/login',(req, res)=>{
    const email = req.body.email;
    const userPassword = req.body.password;
    
    let sql = 'SELECT password FROM new_users WHERE email =?'
    connection.query(sql,[email],(error,results,fields)=>{
        
        if(results.length > 0){
         let hashed = results[0].password
         res.setHeader('Content-Type','application/json')
         let success= {message:true}
         let failed = {message:false}

         bcrypt.compareSync(userPassword,hashed)
         ? 
         res.send(JSON.stringify(success))
         :
         res.send(JSON.stringify(failed))
     }else{
         res.send(JSON.stringify({message:'none'}))
     }

    })

    
})

app.delete('/new/delete/:id',(req, res)=>{
    let sql = 'DELETE FROM new_users WHERE id=?'
    connection.query(sql,[req.params.id],(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/events',(req, res)=>{
    connection.query('SELECT * FROM events',(error, results,fields)=>{
        if(error) throw error;
        res.send(results)
 })
});
app.post('/events/add',(req, res)=>{
    let event = {
        event:req.body.event,
        description:req.body.describe,
        time:req.body.time,
        user_id:req.body.user_id
    }
    let sql = 'INSERT INTO events SET ?'
    connection.query(sql, event, (err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
});
app.delete('/events/delete/:id',(req, res)=>{
    let sql = 'DELETE FROM events WHERE id=?'
    connection.query(sql,[req.params.id],(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/trail',(req, res)=>{
    connection.query('SELECT * FROM audit_trail',(error, results,fields)=>{
        if(error) throw error;
        res.send(results)
 })
});

app.post('/trail/add',(req, res)=>{
    let trail = {
        actor:req.body.actor,
        action:req.body.action,
        time:req.body.time
    }
    let sql = 'INSERT INTO audit_trail SET ?'
    connection.query(sql, trail, (err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
});

app.get('/payroll', (req,res)=>{
    connection.query('SELECT * FROM payroll_table',(error, results, fields)=>{
        if(error)throw error;
        res.send(results)
    })
});

app.post('/payroll/add',(req, res)=>{
    let payroll ={
        staff_id:req.body.id,
        gross_pay:req.body.gross,
        net_pay:req.body.net
    }
    let sql = 'INSERT INTO payroll_table SET ?'
    connection.query(sql,payroll,(err, result)=> {
        if(err)throw err;
        res.send(result)
    })
});

app.get('/leaves',(req, res)=>{
    connection.query('SELECT * FROM leaves_table',(error, results, fields)=>{
        if(error) throw error;
        res.send(results)
    })
});

app.post('/leaves/add',(req, res)=>{
    let leaveDetails = {
        type:req.body.type,
        reason:req.body.reason,
        start_date:req.body.starts,
        end_date:req.body.ends,
        staff_id:req.body.staffId
    }
    let sql = 'INSERT INTO leaves_table SET ?'
    connection.query(sql,leaveDetails,(error, results, fields)=>{
        if(error)throw error;
        res.send(results)
    })
})

app.delete('/leaves/delete/:id',(req, res)=>{
    let sql = 'DELETE FROM leaves_table WHERE id=?'
    connection.query(sql,[req.params.id],(err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
})


app.listen(8000,()=>{
    console.log('Server started on port:8000')
});

