import React from 'react'
import { View,ScrollView, Text,StyleSheet,Image} from 'react-native'
import {connect} from 'react-redux'


import HeaderBar from '../custom/HeaderBar'

const ViewTrainee = ({person}) => {

    const {first_name, last_name,position,experience, date_of_birth,image,qualification}=person

    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.top}>

            </View>
            <ScrollView style={styles.lowersection}>
                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>First name</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{first_name}</Text>
                   </View>
                </View>
                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Last name</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{last_name}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Position</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{position}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Qualification</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{qualification}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Experience</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     {
                         experience >1 ?(<Text style={styles.text}>{experience}{" "}years</Text>):(<Text style={styles.text}>{experience}{" "}year</Text>)
                     }
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Date of birth</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{date_of_birth}</Text>
                   </View>
                </View>
               </ScrollView>
            <View style={styles.extrude}>
                <Image source={{uri:image}} style={{width:185,height:185,borderRadius:185, alignSelf:'center'}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    top:{
        height:'25%',
        width:'100%',
        backgroundColor:'indigo'
    },
    extrude:{
        position:'absolute',
        height:145,
        backgroundColor:'#fff',
        borderRadius:150,
        alignSelf:'center',
        marginTop:'20%',
        elevation:5,
        justifyContent:'center'
    },
    lowersection:{
        flex:1,
        backgroundColor:'white',
        marginTop:100,
        marginBottom:10
    },
    title:{
        fontSize:15,
        color:'black'
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
        color:'darkblue'
    }
})

const mapStateToProps = ({trainers})=>({
    person:trainers.person
});
 
export default connect(mapStateToProps)(ViewTrainee)
