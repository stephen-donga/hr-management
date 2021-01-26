import React,{useState,useEffect} from 'react'
import { View,FlatList,Text,Dimensions,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Feather as Icon} from '@expo/vector-icons'
import {connect} from 'react-redux'
import {setEvents} from '../redux/events/eventActions'

import HeaderBar from '../custom/HeaderBar'
import EventCard from './EventCard'

const {width, height} = Dimensions.get('window')

const Events = ({navigation,addEvents,events}) => {

    const [ eventz, setEventz] = useState(events)

    const fetchEvents = ()=>{
        fetch('http://172.18.69.193:8000/events')
        .then(res =>res.json())
        .then(server=>addEvents(server))
        .catch(error=>console.log(error))
    }
     
    useEffect(() => {
       fetchEvents()
       
    }, [])
    

    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:21,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>Events</Text>
                 
                  <Text> {}</Text>
      

            </View>
            <View style={styles.details}>
            
            <Text style={styles.title}>All Events</Text>
            <View style={{flex:1,backgroundColor:'whitesmoke',marginTop:15}}>
               
                <FlatList 
                        data={events}
                        keyExtractor={item =>item.id.toString()}
                        renderItem={({item})=><EventCard {...item}/>}
                        showsVerticalScrollIndicator={false}
                        />
            </View>

            </View>
            <View style={{position:'absolute',marginTop:"90%",marginLeft:'85%',width:80,height:80}}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('AddEvent')}
                style={{width:'100%',height:'100%',backgroundColor:'fff',alignItems:'center',justifyContent:'center', height:30}}
                >
                     <Icon name="plus-circle" color='blue' size={30}/>
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
        color:'darkblue',
        marginTop:10,
        paddingLeft:10,
        borderBottomWidth:1
    }
});

const mapStateToProps = ({events})=>({
    events:events.events
});

const mapDispatchToProps = dispatch => ({
    addEvents: events => dispatch(setEvents(events))
})
export default connect(mapStateToProps, mapDispatchToProps)(Events);
