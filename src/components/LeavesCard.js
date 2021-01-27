import React from 'react'
import {Entypo} from '@expo/vector-icons'
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'

const LeavesCard = () => {

    const navigation = useNavigation()
   let image =1
    return (
        <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.push('LeaveDetails'))}>
        <View style={styles.container}>
             <View style={styles.leftsection}>
                    {
                        image ?<Image source={require('../../assets/user.png') } style={{width:100,height:100,borderRadius:100}} /> :<Entypo name="user" color='steelblue' size={80} />
                    }
             </View>
             <View style={styles.rightsection}>
                 <View style={{...StyleSheet.absoluteFillObject,backgroundColor:'dodgerblue'}}/>
                <View style={styles.left}>
                    <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold',marginBottom:5}}>Steven Edonga</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Leave type:</Text>
                        <Text style={styles.title}>Sick Leave</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Start:</Text>
                        <Text style={styles.label1}> Eend:</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.title}>12/02/2021</Text>
                        <Text style={styles.title}>12/05/2021</Text>
                    </View>

                </View>
             </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        flexDirection:'row',
    },
    leftsection:{
        width:"30%",
        height:'100%',
        backgroundColor:'dodgerblue',
        alignItems:'center',
        justifyContent:'center'
    },
    rightsection:{
        width:'70%',
        height:'100%',
    },
    left:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderTopLeftRadius:35,
        marginTop:5,
        padding:5
    },
    label:{
        fontSize:15,
        color:'darkblue'
    },
    label1:{
        fontSize:15,
        color:'darkblue',
        marginLeft:80
    },
    title:{
        marginLeft:15,
        fontSize:15,
        fontWeight:'bold',
        color:'steelblue',
    },
    row:{
        flexDirection:'row',
        marginBottom:3,
        marginLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    }
})

export default LeavesCard
