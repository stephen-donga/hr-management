import React,{useState,useEffect} from 'react'
import { View,FlatList, Text,ScrollView, StyleSheet } from 'react-native'
import HeaderBar from '../custom/HeaderBar'
import {urlConnection} from '../utils/url'
import PayCard from './PayCard'
import Fullstack from './Fullstack'
import Backend from './Backend'
import Frontend from './Frontend'

const Payroll = () => {

    const[salaries,setSalaries]= useState([])
    const [staff, setStaff] = useState([])
    // console.warn(staff)


    const intern = staff.filter(intern=>intern.position=="Intern Developer")
    const backend = staff.filter(backend =>backend.position=="Backend Developer")
    const frontend = staff.filter(front =>front.position=="Frontend Developer")
    const fullstk = staff.filter(full =>full.position=="Fullstack Developer")

    const fetchSalaries =()=>{
        fetch(urlConnection('payroll'))
        .then(res =>res.json())
        .then(res =>setSalaries(res))
        .catch(err =>console.log(err))
    }
    const fetchStaff =()=>{
        fetch(urlConnection('staff'))
        .then(res =>res.json())
        .then(res =>setStaff(res))
        .catch(err =>console.log(err))
    }

    useEffect(() => {
        fetchSalaries()
        fetchStaff()
        
    }, [ ])
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width: "100%",height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={styles.title}>Payroll</Text>
            </View>
            < View style={{width:'100%',}}>
                <Text style={{marginBottom:15,paddingLeft:15,fontWeight:'bold'}}>Intern Developers</Text>
                <FlatList 
                    data={intern}
                    renderItem={({item})=> <PayCard salaries={salaries} {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                 <Text style={{marginBottom:15,paddingLeft:15,fontWeight:'bold'}}>Frontend Developers</Text>
                <FlatList 
                    data={frontend}
                    renderItem={({item})=> <Frontend salaries={salaries}{...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                 <Text style={{marginBottom:15,paddingLeft:15,fontWeight:'bold'}}>Backend Developers</Text>
                <FlatList 
                    data={backend}
                    renderItem={({item})=> <Backend salaries={salaries} {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                 <Text style={{marginBottom:15,paddingLeft:15,fontWeight:'bold'}}>Fullstack Developers</Text>
                <FlatList 
                    data={fullstk}
                    renderItem={({item})=> <Fullstack  salaries={salaries}{...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    }
})

export default Payroll
