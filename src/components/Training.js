import React,{useEffect} from 'react'
import { View, Text,Dimensions,StyleSheet, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {setTrainingList} from '../redux/training/trainingActions'

import HeaderBar from '../custom/HeaderBar'
import TrainerCard from '../components/TrainerCard'
import {urlConnection} from '../utils/url'
 
const {width, height} = Dimensions.get('window')

const Training = ({navigation,trainees,trainers}) => {

    const fetchTrainees = () =>{
        fetch(urlConnection('trainee'))
        .then(res => res.json())
        .then(res => trainers(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTrainees()
    }, [])

    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>Members on Training</Text>

            </View>
            <View style={styles.details}>
            {
                trainees.length>0 ?(
                    <FlatList 
                        data={trainees}
                        renderItem={({item})=> <TrainerCard {...item}/>}
                        keyExtractor={member =>member.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ):(
                       <Text style={{alignSelf:'center',marginTop:70, fontSize:17, color:'grey'}}> No one is on training at the moment ! </Text>
                )
            }
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
     details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    }
})

const mapStateToProps = ({trainers}) =>({
    trainees: trainers.trainers
})

const mapDispatchToProps = dispatch =>({
    trainers:students =>dispatch(setTrainingList(students))
})

export default connect(mapStateToProps, mapDispatchToProps)(Training);
