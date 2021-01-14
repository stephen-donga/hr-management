import db from './database' 

const auditTrail = ()=>{

}
auditTrail.logTrail=(trail)=>{
    db.transaction(tx =>{
        tx.executeSql('INSERT INTO audit_trail (actor,action,time) values (?,?,?)',[`${trail.actor}`,`${trail.action}`,`${trail.time}`],
        (txObj,resultSet)=>console.log(resultSet),
        (txObj, error)=>console.log('Error', error)
        )
    })
  

}


module.exports =  auditTrail;