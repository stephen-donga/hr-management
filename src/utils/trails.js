import db from './database' 

const auditTrail = () =>{
    
}
auditTrail.logTrail=(trail)=>{

    fetch('http://172.18.100.1:8000',{
        method:'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                actor:trail.actor,
                action:trail.action,
                time:trail.time,
             })

    })
    .then(res =>res.json())
    .then(server=>console.log(server))
    .catch(error=>console.log(error))

    // db.transaction(tx =>{
    //     tx.executeSql('INSERT INTO audit_trail (actor,action,time) values (?,?,?)',[`${trail.actor}`,`${trail.action}`,`${trail.time}`],
    //     null,
    //     (txObj, error)=>console.log('Error', error)
    //     )
    // })
}


module.exports =  auditTrail;