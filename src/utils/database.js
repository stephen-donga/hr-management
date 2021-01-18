import *as SqlLite from 'expo-sqlite'

const db = SqlLite.openDatabase('human_resource_db4')

db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS all_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username Text, password Text)'
  )
});

  db.transaction(tx =>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS staff_members (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name Text, last_name Text,position Text, qualification Text, experience INT, date_of_birth Text)'
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