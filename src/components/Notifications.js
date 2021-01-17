import React,{useState, useEffect} from 'react'
import { View,ScrollView, Text ,StyleSheet,Dimensions} from 'react-native'
import HeaderBar from '../custom/HeaderBar'
import db from '../utils/database'

const {width,height} = Dimensions.get('window')
const Notifications = () => {
    const [data, setData] = useState([])

    const fetchNotifications =()=>{

        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM audit_trail',null,
            (txObj,{rows:{_array}})=>setData(data.concat(_array)),
            (txObj,error)=>console.warn(error))
          })
    }


   useEffect(() => {
       fetchNotifications()
       return () => {
            
       }
   }, [])

    return (
        <View style={styles.container}>
            <HeaderBar />
            <Text style={styles.heading}>Notifications</Text>
            <View style={styles.hr}/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            {
                data.map(item=>(
                    
                        <View  key={item.id} style={{width:width/2+180,height:height/8+40,justifyContent:'center',paddingLeft:20,backgroundColor:'pink',marginBottom:25}}>
                        <Text>{item.actor} </Text>
                        <Text>{item.action}</Text>
                        <Text> {item.time}</Text>
                        </View>
                    
                ))
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        alignItems:'center',
        backgroundColor:'white',
        paddingBottom:50
    },
    heading:{
        fontSize:18,
        color:'darkblue',
        marginTop:5
    },
    hr:{
        width:width/2+180,
        borderWidth:1,
        borderColor:'darkgrey'
    }
})

export default Notifications
