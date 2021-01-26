import db from './database' 

const auditTrail = () =>{
    
}
auditTrail.logTrail=(trail)=>{

    fetch('http://192.168.137.1:8000/trail/add',{
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
}


module.exports =  auditTrail;