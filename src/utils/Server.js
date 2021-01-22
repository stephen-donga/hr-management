const express = require('express');
const parser = require('body-parser')
const mysql = require('mysql')


const app = express()

app.use(parser.json());
// app.use(parser.urlencoded({extended:false}));

// Creating database connection
const connection = mysql.createConnection({
    host:'https://remotemysql.com/phpmyadmin/db_structure.php?server=1&db=cocAo8GntH',
    username:"cocAo8GntH",
    password:'EDNrmA4xKa',
    // database:'staff_management'
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
 })

 app.post('/users/add',(req, res)=>{
     let user = {
         first_name:req.body.firstname,
         last_name:req.body.lastname,
         user_name:req.body.username,
         password:req.body.password
     }
     let sql = 'INSERT INTO users SET ?'
     let queri = connection.query(sql, user, (err, result) => {
         if(err)throw err;
         res.send(result)

     })

 })

 app.get('/staff',(req, res)=>{
    connection.query('SELECT * FROM staff_members',(error, results,fields)=>{
           if(error) throw error;
           res.send(results)
    })
})

 app.post('/staff/add',(req, res)=>{
    let user = {
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        date_of_birth:req.body.date,
        qualification:req.body.qualification,
        experience:req.body.experience,
        position:req.body.position
       
    }
    let sql = 'INSERT INTO staff_members SET ?'
    let queri = connection.query(sql, user, (err, result) => {
        if(err)throw err;
        res.send(result)
        console.log(result)

    })

})


app.listen(8000,()=>{
    console.log('Server started on port:8000')
})

 

module.exports = connection;