import React, {useState,useEffect} from 'react'
import { View, Text ,StyleSheet, Image,Dimensions, Button} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import { StackActions,useNavigation } from '@react-navigation/native';
import {setNumberOfUsers} from '../redux/user/userAction'

import HeaderBar from '../custom/HeaderBar'
import Homepage from './Homepage'

const {width, height} = Dimensions.get('window')

const HomeScreen = ({currentUser,setUsers,allStaff}) => {


    const navigation = useNavigation()

    const [fetched, setFetched] = useState([])
    const [newUsers, setNewUsers] = useState([])

    const fetchUsers = () => {
        fetch('http://192.168.130.161:8000/users')
        .then(res =>res.json())
        .then(server=>setFetched(server))
        .catch(error=>console.log(error))

        fetch('http://192.168.130.161:8000/new')
        .then(res =>res.json())
        .then(server=>setNewUsers(server))
        .catch(error=>console.log(error))
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    const users  = fetched.concat(newUsers)
    setUsers(users)

    let totalStaff = allStaff.length
    let totalUsers = users.length
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.head}>
                <View style={styles.top}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.heading}>HRMS</Text>
                        <Text style={styles.phrase}>Welcome  {currentUser}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity 
                          onPress={()=>navigation.navigate('Userprofile')}
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
         
            <View style={styles.lastsection}>
                <Text style={styles.title}>All members</Text>
                    <FlatList 
                    data={[{name:'Staff',urls:require('../../assets/staff2.png'),number:totalStaff,screen:'Staff'},
                    {name:'Users',urls:require('../../assets/user.png'),number:totalUsers,screen:'Users'}]}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=>navigation.navigate(item.screen)}>
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
        marginLeft:width/2-60,
        marginTop:"30%",
        position:'absolute',
        width:width/2+50,
        height:height/3-50,
        padding:5,
        backgroundColor:'whitesmoke',
        alignItems:'center',
        justifyContent:"space-evenly",
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
    allStaff: staff.staff,
    roles: user.actions
  });

  const mapDispatchToProps = dispatch =>({
      setUsers: users => dispatch(setNumberOfUsers(users))
  })

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
