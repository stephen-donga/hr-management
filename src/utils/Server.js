const express = require('express');
const parser = require('body-parser')
const mysql = require('mysql')


const app = express()

app.use(parser.json());
// app.use(parser.urlencoded({extended:false}));

// Creating database connection
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
            if(error) throw error;
            res.send(results)
     })
 });

 app.post('/users/add',(req, res)=>{
     let user = {
          email:req.body.email,
          suer_id:req.body.id,
          role:req.body.role,
          password:req.body.password
     }
     let sql = 'INSERT INTO users SET ?'
     connection.query(sql, user, (err, result) => {
         if(err)throw err;
         res.send(result)
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
    let user = {
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        position:req.body.position,
        qualification:req.body.qualification,
        experience:req.body.experience,
        date_of_birth:req.body.date,
        image:req.body.image
    }
    let sql = 'INSERT INTO staff_members SET ?'
    connection.query(sql, user, (err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
});

app.put('/staff/update',(req, res)=>{
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let position = req.body.position
    let qualification = req.body.qualification
    let exp = req.body.experience
    let experience = parseInt(exp)
    let date = req.body.date
    let id = req.body.id
  let sql = `UPDATE staff_members SET  (first_name, last_name) VALUES (?,?) WHERE id =${id}`
  connection.query(sql,[firstname, lastname],(err, result) => {
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

app.get('/new',(req, res)=>{
    connection.query('SELECT * FROM new_users',(error, results,fields)=>{
        if(error) throw error;
        res.send(results)
 })
});

app.post('/new/adduser',(req, res)=>{
    let user ={
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        email:req.body.email,
        role:req.body.role,
        password:req.body.password
    }

    let sql = 'INSERT INTO new_users SET ?'
    connection.query(sql, user, (err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)
    })
});

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


app.listen(8000,()=>{
    console.log('Server started on port:8000')
});
