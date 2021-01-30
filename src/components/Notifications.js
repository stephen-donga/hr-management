import React,{useState, useEffect} from 'react'
import { View,ScrollView, Text ,StyleSheet,Dimensions} from 'react-native'
import HeaderBar from '../custom/HeaderBar'
import {urlConnection} from '../utils/url'

const {width,height} = Dimensions.get('window')
const Notifications = () => {
    const [data, setData] = useState([])

    const fetchNotifications =()=>{
        fetch(urlConnection('trail'))
        .then(res =>res.json())
        .then(server=>setData(server))
        .catch(error=>console.log(error))
    }

   useEffect(() => {
       fetchNotifications()
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
                    
                        <View  key={item.id} style={{width:width/2+130,height:height/8+40,justifyContent:'center',paddingLeft:20,backgroundColor:'white',elevation:5,marginBottom:25}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>{item.actor} </Text>
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
        width:width/2+130,
        borderWidth:1,
        borderColor:'darkgrey'
    }
})

export default Notifications
