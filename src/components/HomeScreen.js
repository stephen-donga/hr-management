import React, {useState} from 'react'
import { View, Text ,StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import HeaderBar from '../custom/HeaderBar'
import Homepage from './Homepage'

const {width, height} = Dimensions.get('window')

const HomeScreen = () => {

    const[showDropDown,setShowDropDown] = useState(false)
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.head}>
                <View style={styles.top}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.heading}>HRMS</Text>
                        <Text style={styles.phrase}>Welcome user</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity 
                        onPress={()=>setShowDropDown(!showDropDown)}
                        >
                            <Text>see details</Text>
                        </TouchableOpacity>
                    </View>
                    
                    

                </View>
                

                <View style={styles.bottom}></View>
            </View>
            <View style={styles.midsection}>
                <Homepage />

            </View>
           {
               showDropDown&&(
                <View style={styles.dropdown}>
                <Text>fdfh</Text>
            </View>
               )
           }
            <View style={styles.lastsection}>
                <Text style={styles.title}>Teams</Text>

             </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
    },
    head:{
        width:width,
        height:height/7+50,
        backgroundColor:'whitesmoke'
    },
    top:{
        width:width,
        height:'70%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    bottom:{
        width:width,
        height:'30%',
        backgroundColor:'white'
    },
    midsection:{
        width:width,
        height:200,
        backgroundColor:'white',
        position:'relative'
    },
    lastsection:{
        flex:1,backgroundColor:'white',
        padding:10,
        position:'relative'
    },
    headerLeft:{
        width:width/2+50,
        height:'100%',
        padding:5,
        position:'relative'
    },
    headerRight:{
        width:width/6+40,
        height:'100%',
        padding:10,
        position:'relative',
    },
    heading:{
        fontSize:30,
        color:'teal',
        fontWeight:'bold'
    },
    phrase:{
        fontSize:13,
        fontWeight:'bold',
        color:'steelblue'
    },
    title:{
        fontSize:21,
        fontWeight:'bold',
        color:'steelblue'
    },
    dropdown:{
        marginLeft:width/2-10,
        marginTop:90,
        position:'absolute',
        width:width/2,
        height:height/3,
        padding:10,
        backgroundColor:'white',
        borderRadius:5,
        borderColor:'teal',
        borderWidth:1
    }
})

export default HomeScreen
