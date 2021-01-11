import React from 'react'
import { View, Text,StyleSheet ,Dimensions} from 'react-native'
import{Entypo} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"
import HeaderBar from '../custom/HeaderBar'

const {width,height} = Dimensions.get('window')

const ViewStaff = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
           <View style={styles.topsection}>
               <Entypo name="user" size={80} color="steelblue" />

           </View>
           <View style={styles.extrudingsection}>
               <Text style={styles.text}> </Text>
               <View style={styles.userdetails}>
                    <View style={styles.righttdetailsection}>
                        <Text style={styles.title}>Name:</Text>
                        <Text style={styles.label}>Stephen Edonga</Text>
                        <Text style={styles.title}>Role:</Text>
                        <Text style={styles.label}>Administrator</Text>
                        <Text style={styles.title}>Experience:</Text>
                        <Text style={styles.label}>1 year</Text>
                        <Text style={styles.title}>Age:</Text>
                        <Text style={styles.label}>35 </Text>

                    </View>

               </View>
               

           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
    },
    topsection:{
        width:width,
        height:height/3,
        alignItems:'center',
        paddingTop:20,
        backgroundColor:'mediumaquamarine',
        position:'relative'
    },
    extrudingsection:{
        width:width/3+150,
        height:height/2+50,
        backgroundColor:'white',
        marginTop:-55,
        alignSelf:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        shadowOpacity:0.34,
        elevation:5, 
        borderRadius:5,
        paddingTop:25,
        paddingLeft:15,
        position:'relative'
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        color:'steelblue'
    },
    userdetails:{
        width:'100%',
        height:'80%',
        position:"absolute",
        borderTopWidth:1,
        borderTopColor:'steelblue',
        marginTop:60,
        alignSelf:'center',
        flexDirection:'row'
    },
    leftdetailsection:{
        width:'10%',
        height:'100%',
        padding:5
    },
    righttdetailsection:{
        width:'90%',
        height:'100%',
        padding:5
    },
    title:{
        fontSize:15,
        color:'steelblue',
        fontWeight:'bold'
    },
    label:{
        fontSize:15,
        color:'black',
        paddingLeft:10,
        marginBottom:15
    }

})

export default ViewStaff
