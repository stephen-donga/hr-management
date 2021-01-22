import React,{useState,useEffect} from 'react'
import { View,FlatList,Text,Dimensions,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Feather as Icon} from '@expo/vector-icons'
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import db from '../utils/database'
import EventCard from './EventCard'

const {width, height} = Dimensions.get('window')

const Events = ({navigation,roles }) => {

    const [events, setEvents] = useState([])
    
    let roleObj = roles[0]

    const fetchEvents = ()=>{
        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM events',null,
            (txObj,{rows:{_array}})=>setEvents(events.concat(_array))),
            (txObj, error)=>console.log('Error',error)
        })
    }

    useEffect(() => {
       fetchEvents()
        return () => {
        }
    }, [])


    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>Events</Text>
                 
                  <Text> {}</Text>
      

            </View>
            <View style={styles.details}>
            
            <Text style={styles.title}>All Events</Text>
            <View style={{flex:1,backgroundColor:'white',marginTop:5}}>
               
                <FlatList 
                        data={events}
                        keyExtractor={item =>item.id.toString()}
                        renderItem={({item})=><EventCard {...item}/>}
                        />
            </View>

            </View>
            <View style={{position:'absolute',marginTop:30,marginLeft:'85%',width:20}}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('AddEvent',{fetchEvents})}
                style={{width:'100%',height:'100%',backgroundColor:'fff',alignItems:'center',justifyContent:'center', height:30}}
                >
                     <Icon name="plus-circle" color='green' size={30}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'white'
    },
     details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'flex-start',
        color:'black',
        marginTop:10,
        paddingLeft:10
    }
})

const mapStateToProps = ({user})=>({
    roles: user.actions
})
export default connect(mapStateToProps)(Events);
