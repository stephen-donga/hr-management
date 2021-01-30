import React,{useEffect} from 'react'
import { View, StyleSheet,Text,Dimensions,FlatList } from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'

import {setLeaves} from '../redux/leaves/leavesActions'
import HeaderBar from '../custom/HeaderBar'
import LeavesCard from '../components/LeavesCard'
import {urlConnection} from '../utils/url'


const {width, height} = Dimensions.get('window')

const Leaves = ({leaves,setLeaves,navigation}) => {


    const fetchLeaves = ()=>{
        fetch(urlConnection('leaves'))
        .then(res => res.json())
        .then(res =>setLeaves(res))
        .catch(error =>console.log(error))
    }

    useEffect(() => {
        fetchLeaves()
    }, [])
     
    
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={styles.title}>All members on Leave</Text>
            </View>
            <View style={styles.add}>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Staff')} 
                >
                    <Feather name='plus-circle' size={30} color='green' />
                </TouchableOpacity>
            </View>
             <View style={styles.details}>
                  <FlatList
                    data={leaves}
                    renderItem={({item})=> <LeavesCard {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                  />
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'#ccc'
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
    },
    add:{
        position:'absolute',
        marginTop:'120%',
        marginLeft:'80%'
    }
})

const mapStateToProps = ({leaves})=>({
    leaves:leaves.leaves
});

const mapDispatchToProps = dispatch =>({
    setLeaves: leave =>dispatch(setLeaves(leave))
})

export default connect(mapStateToProps,mapDispatchToProps)(Leaves)
