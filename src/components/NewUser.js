import { setStatusBarBackgroundColor } from 'expo-status-bar'
import React, {useState} from 'react'
import { View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import InputField from '../custom/Inputfield'
import db from '../utils/database'
import auditTrail from '../utils/trails'

const {width, height} = Dimensions.get('window')
const NewUser = ({navigation, currentUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const createUser = ()=>{
        db.transaction(tx =>{
        tx.executeSql('INSERT INTO all_users (username,password) values (?,?)',[ username,password],
        (txObj,resultSet)=>console.log(resultSet),
        (txObj, error)=>console.log('Error', error)
        )
        })
        let trail ={
            actor:currentUser,
            action:`Created new user with username "${username}"`,
            time: new Date().toString()
        }
        auditTrail.logTrail(trail)
    }
    const handleAddUser =()=>{
        if(password===confirm){
            createUser();
            navigation.navigate('Home')
        }else{
            alert('Passwords don\'t match')
        }
    }

    return (
        <View style={{width:width,height:height,backgroundColor:'white'}}>
            <HeaderBar />
             <View style={{width:'100%',
                height:'100%', 
                backgroundColor:'whitesmoke',
                padding:10,
                alignItems:'center',
                justifyContent:'center'
                }}>
                <Text style={{fontSize:20,color:'darkblue',fontWeight:'bold',alignSelf:'center',marginBottom:50}}>Create New User</Text>
                 <InputField 
                    label ="Username"
                    icon='user'
                    placeholder="Input a username here"
                    value={username}
                    changeHandler={(e)=>setUsername(e)}
                    />
                    <InputField 
                        label ="Password"
                        icon='lock'
                        placeholder="Enter password"
                        value={password}
                        textEntry={true}
                        changeHandler={(e)=>setPassword(e)}
                    />
                    <InputField 
                        label ="Confirm Password"
                        icon='lock'
                        placeholder="Confirm password"
                        value={confirm}
                        textEntry={true}
                        changeHandler={(e)=>setConfirm(e)}
                    />

                        <TouchableOpacity
                        onPress={handleAddUser}
                        style={{width:150,height:40,backgroundColor:'blue',alignItems:'center',justifyContent:'center'}} 
                        >
                            <Text style={{fontWeight:'bold',fontSize:15,color:'white'}}>Create</Text>
                        </TouchableOpacity>



             </View>
        </View>
    )
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser,
     
  });

export default connect(mapStateToProps)(NewUser)
