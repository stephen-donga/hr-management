import React, {useState} from 'react'
import { View, Text ,StyleSheet, Image,Dimensions} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 

let fname="edonga"
let lname="steven"
let age = 23
let position ='lawyer'
let qualification = 'diploma'
let experience = 2
let id =4
let image = null


import HeaderBar from '../custom/HeaderBar'
import Homepage from './Homepage'
import { StackActions, TabActions, useNavigation } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

const {width, height} = Dimensions.get('window')

const HomeScreen = () => {

    const navigation = useNavigation()

    const[showDropDown,setShowDropDown] = useState(false)

    const handleLogOut = ()=>{
        setShowDropDown(!showDropDown)
        navigation.dispatch(StackActions.push('Login'))
    }
    const handleEdit = ()=>{
        setShowDropDown(!showDropDown)
        navigation.navigate('EditStaff',{fname,lname,id,age,position,qualification,image,experience})
    }
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
                            <Image style={{width:50,borderWidth:1,borderColor:'teal',height:50,borderRadius:50}} source={require('../../assets/profile.jpg')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.bottom}>
                    <Text> </Text>
                </View>
            </View>
            <View style={styles.midsection}>
                <Homepage />

            </View>
           {
               showDropDown&&(
                <View style={styles.dropdown}>
                    <Text style={styles.labels}>Name:</Text>
                    <Text style={styles.detail}>Rebbecca Aisha</Text>
                    <Text style={styles.labels}>Title:</Text>
                    <Text style={styles.detail}>C.T.O</Text>
                    <Text style={styles.labels}></Text>
                    <View style={{width:'100%',alignSelf:"baseline",height:40,flexDirection:'row',justifyContent:"space-evenly"}}>
                        <TouchableOpacity
                        onPress={handleEdit} 
                        style={{width:50,height:25,borderWidth:1,borderColor:'teal',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}
                        >
                             <Text>Edit</Text>
                             </TouchableOpacity>

                             <TouchableOpacity
                             onPress={handleLogOut}
                             style={{backgroundColor:'green',borderColor:'teal',borderWidth:1,width:25,padding:2,borderRadius:30,height:25}} 
                             >
                                <AntDesign name="logout" size={18} color="black" />
                             </TouchableOpacity>
                    </View>
               </View>
               )
           }
            <View style={styles.lastsection}>
                <Text style={styles.title}>All members</Text>
                    <FlatList 
                    data={[{name:'Staff',urls:require('../../assets/staff2.png'),number:34},
                    {name:'Users',urls:require('../../assets/user.png'),number:15}]}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=>alert(item.name)}>
                            <View style={{position:'relative',}}>
                                <Image style={{width:110,
                                    margin:20,
                                    alignSelf:'center',
                                    paddingLeft:width/3,
                                    height:90,
                                    backgroundColor:'white'}} source={item.urls}/>
                            <View style={styles.numbercircle}>
                                <Text>{item.number}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    }}
                    numColumns={2}
                    keyExtractor={item=>item.name}
                    />

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
        height:height/7+20,
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
        backgroundColor:'white',
        paddingHorizontal:10
    },
    midsection:{
        width:width,
        height:height/2-50,
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
        fontSize:17,
        fontWeight:'bold',
        color:'steelblue'
    },
    dropdown:{
        marginLeft:width/2-10,
        marginTop:90,
        position:'absolute',
        width:width/2,
        height:height/3-50,
        padding:10,
        backgroundColor:'whitesmoke',
        borderRadius:5,
        borderColor:'teal',
        borderWidth:1
    },
    userssection:{
        width:width,
        flexDirection:'row'
    },
    labels:{
        fontSize:14,
        fontWeight:'bold'
    },
    detail:{
        fontSize:12,
        color:'darkblue'
    },
    numbercircle:{
        position:'absolute',
        width:35,
        height:35,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'red',
        borderRadius:45,
        marginTop:15,
        marginLeft:100,
        alignItems:'center',
        justifyContent:'center'}
})

export default HomeScreen
