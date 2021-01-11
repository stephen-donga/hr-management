import React, { useState } from 'react'
import {View,SafeAreaView ,Text,StyleSheet,TouchableOpacity} from 'react-native';

import Inputfield from '../custom/Inputfield'
import Button from '../custom/Button'

const Login = ({navigation}) => {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userError,setUserError] = useState("")
    const [passwordError,setPasswordError] = useState("")

    const user ={
        username:"steven",
        password:"edonga"
    }


    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const validate = () =>{

        if(userError=="")setUserError("Please enter a valid username")
        if(passwordError=="")setPasswordError("Please enter a valid password")
        if(username ==user.username&&password ==user.password){
            navigation.navigate('Home');
            setUsername("");
            setPassword("")
        }
        else{
            alert('Enter correct credentials please !')
        }
        
    }

    const handleLogin = () => {
        validate();
        // fetch('http://192.168.137.1:8000/users')
        // .then(response =>console.log(JSON.stringify(response)))
        // .catch(error =>console.warn(error))
        
    }
  
        return (
            <SafeAreaView style={styles.container}>
                <View style={{width:'100%',height:'40%',backgroundColor:'white'}} >
                    <View style={{height:120,width:'100%',paddingTop:20,borderRadius:30,backgroundColor:'#B0AAA7',position:'relative',alignItems:'center'}}>
                        <View style={{width:'100%',height:25,backgroundColor:'#827C79',...StyleSheet.absoluteFillObject}}/>
                        <Text style={{fontSize:18,color:'white'}}></Text>
                        <Text style={{fontSize:28,fontWeight:'bold',color:'white'}}>HRM</Text>
                    </View>

                </View>

               <View style={{height:'60%',paddingTop:10}}>
               <View style={{width:'85%',borderRadius:10,padding:11}}>
                     
                     <Inputfield 
                         label="Username"
                         icon="user"
                         value={username}
                         message={username ?'':userError}
                         placeholder="Enter Username"
                         changeHandler={handleUsernameChange }
 
                  />
                  <Inputfield 
                     label="Password"
                     icon="lock"
                     textEntry={true}
                     message={password ?'':passwordError}
                     value={password}
                     isPaasword={true}
                     placeholder="Enter Password"
                     changeHandler ={handlePasswordChange}
 
                  />
                
                 </View>
                 
                <Button 
                 title="Login"
                 pressHandler={handleLogin}
                 />
                 <TouchableOpacity
                    style={{marginTop:10,height:30,width:150}}
                    onPress={()=>alert('Reset password ?')}
                 >
                   <Text style={{color:'grey',paddingLeft:20,paddingTop:5}}>Forgot password ?</Text>
                 </TouchableOpacity>
               </View>

                
            </SafeAreaView>
        )
    }
 

const styles = StyleSheet.create({
    container:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'

    }
})

export default Login;
