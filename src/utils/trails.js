import * as SqlLite from 'expo-sqlite'
const db = SqlLite.openDatabase('testDb');

db.transaction(tx=>{ 
    tx.executeSql('CREATE TABLE IF NOT EXISTS trails (id INTEGER PRIMARY KEY AUTOINCREMENT, actor Text, action Text, time Text)')
})

const auditTrail = ()=>{

}
auditTrail.logTrail=(trail)=>{
    db.transaction(tx =>{
        tx.executeSql('INSERT INTO trails (actor,action,time) values (?,?,?)',[`${trail.actor}`,`${trail.action}`,`${trail.time}`],
        (txObj,resultSet)=>console.log(resultSet),
        (txObj, error)=>console.log('Error', error)
        )
    })
  

}


module.exports =  auditTrail;