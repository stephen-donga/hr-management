import React, {useState} from 'react'
import { View, Text ,StyleSheet, Image,Dimensions, Button} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import { StackActions,useNavigation } from '@react-navigation/native';

import HeaderBar from '../custom/HeaderBar'
import Homepage from './Homepage'

const {width, height} = Dimensions.get('window')

const HomeScreen = ({currentUser, allStaff}) => {


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

    let totalStaff = allStaff.length
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.head}>
                <View style={styles.top}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.heading}>HRMS</Text>
                        <Text style={styles.phrase}>Welcome {currentUser}</Text>
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
                    <Text style={styles.labels}>Username:</Text>
                    <Text style={styles.detail}>{currentUser}</Text>
                    <Text style={styles.labels}>Title:</Text>
                    <Text style={styles.detail}>C.T.O</Text>
                    <Text style={styles.labels}></Text>
                        <Button 
                        onPress={()=>{
                            setShowDropDown(!showDropDown)
                            navigation.dispatch(StackActions.push('NewUser'))
                        }}
                        title='Add new User'
                        />
                    <View style={{width:'100%',alignSelf:"baseline",height:40,flexDirection:'row',marginTop:25,justifyContent:"space-evenly"}}>
                        <TouchableOpacity
                        onPress={handleEdit} 
                        style={{width:50,height:25,borderWidth:1,borderColor:'teal',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}
                        >
                             <Text>Edit</Text>
                             </TouchableOpacity>

                             <TouchableOpacity
                             onPress={handleLogOut}
                             style={{backgroundColor:'white',borderColor:'teal',borderWidth:1,width:50,alignItems:'center',justifyContent:'center',padding:2,borderRadius:5,height:25}} 
                             >
                                <AntDesign name="logout" size={15} color="black" />
                             </TouchableOpacity>
                    </View>
               </View>
               )
           }
            <View style={styles.lastsection}>
                <Text style={styles.title}>All members</Text>
                    <FlatList 
                    data={[{name:'Staff',urls:require('../../assets/staff2.png'),number:totalStaff},
                    {name:'Users',urls:require('../../assets/user.png'),number:1}]}
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
        paddingLeft:15,
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
        fontSize:16,
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
        height:height/3,
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
        fontSize:16,
        fontWeight:'bold'
    },
    detail:{
        fontSize:15,
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

const mapStateToProps = ({user,staff}) => ({
    currentUser: user.currentUser,
    allStaff: staff.staff
  });

export default connect(mapStateToProps)(HomeScreen)
