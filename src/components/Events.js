import React,{useEffect} from 'react'
import { View,FlatList,Text,Dimensions,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {setEvents} from '../redux/events/eventActions'
import {FAB} from 'react-native-paper'

import HeaderBar from '../custom/HeaderBar'
import EventCard from './EventCard'
import {urlConnection} from '../utils/url'

const {width, height} = Dimensions.get('window')
const Events = ({navigation,addEvents,events}) => {

    const fetchEvents = ()=>{
        fetch(urlConnection('events'))
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
                <Text style={{fontSize:15,fontWeight:'bold',alignSelf:'center',color:'black'}}>Events</Text>
                <Text>{}</Text>
      

            </View>
            <View style={styles.details}>
            <View style={{flex:1,backgroundColor:'white',marginTop:15}}>
               
                <FlatList 
                        data={events}
                        keyExtractor={item =>item.id.toString()}
                        renderItem={({item})=><EventCard {...item}/>}
                        showsVerticalScrollIndicator={false}
                        />
            </View>

            </View>
          
            <FAB
                    onPress={()=>navigation.navigate('AddEvent')}
                style={{position:'absolute',margin:16,margin:0,bottom:25,right:15}}
                small
                icon="plus"
                color='white'
                />
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
        fontSize:15,
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
