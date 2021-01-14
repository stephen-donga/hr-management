import React,{useState, useEffect} from 'react'
import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import HeaderBar from '../custom/HeaderBar'
import * as SqlLite from 'expo-sqlite'

const {width,height} = Dimensions.get('window')
const Notifications = () => {
    const [data, setData] = useState([])

    const fetchNotifications =()=>{
        const db = SqlLite.openDatabase('testDb');

        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM trails',null,
            (txObj,{rows:{_array}})=>setData(data.concat(_array)),
            (txObj,error)=>console.warn(error))
          })
    }


   useEffect(() => {
       fetchNotifications()
       return () => {
            
       }
   }, [])
   console.log(data)
    return (
        <View style={styles.container}>
            <HeaderBar />
            <Text style={styles.heading}>Notifications</Text>
            <View style={styles.hr}/>
            {
                data.map(item=><Text key={item.id}>{item.actor}create{item.action}</Text>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        alignItems:'center',
        backgroundColor:'white'
    },
    heading:{
        fontSize:18,
        color:'darkblue',
        marginTop:5
    },
    hr:{
        width:width/2+100,
        borderWidth:1,
        borderColor:'darkgrey'
    }
})

export default Notifications
