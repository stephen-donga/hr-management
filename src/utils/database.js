import *as SqlLite from 'expo-sqlite'

const db = SqlLite.openDatabase('human_resource_management_database')

//Roles table
db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS roles_table (id INTEGER PRIMARY KEY AUTOINCREMENT, role Text, create_new_user INT,assign_roles INT, edit_user INT, delete_user INT, add_staff INT, edit_staff INT, delete_staff INT)'
  )
});


// users table,
db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS  users (id INTEGER PRIMARY KEY AUTOINCREMENT, username Text, password Text,user_id INT,role Text)'
  )
});

  // staff-mebers table
  db.transaction(tx =>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS staff_members (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name Text, last_name Text,position Text, qualification Text, experience INT, date_of_birth Text,image Text)'
      )
  });


  db.transaction(tx =>{
    tx.executeSql('CREATE TABLE IF NOT EXISTS audit_trail (id INTEGER PRIMARY KEY AUTOINCREMENT, actor Text, action Text,time Text)'
    )
});

db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, event Text, description Text,date Text)'
  )
});


module.exports = db;