import React, { useState, useEffect } from 'react'
import {View,SafeAreaView ,Button,Text,StyleSheet,TouchableOpacity} from 'react-native';
import auditTrail from '../utils/trails'
import db from '../utils/database'
import {connect} from  'react-redux'
import {setCurrentUser} from '../redux/user/userAction'

import Inputfield from '../custom/Inputfield'

const Login = ({navigation,setCurrentUser}) => {

    const [fetched, setFetched] = useState([])

    const fetchUsers = () => {
        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM all_users',null,
            (txObj,{rows:{_array}})=>setFetched(fetched.concat(_array))),
            (txObj, error)=>console.log('Error',error)
        })


    }

    const insertIfDbEmpty = ()=>{
        db.transaction(tx =>{
        tx.executeSql('INSERT INTO all_users (username,password) values (?,?)',[ 'root','hrms123'],
        (txObj,resultSet)=>console.log(resultSet),
        (txObj, error)=>console.log('Error', error)
        )
        })
    }

    useEffect(() => {
        fetchUsers();
        return () => {
          
        }
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userError,setUserError] = useState("")
    const [passwordError,setPasswordError] = useState("")

    const filteredUser = fetched.filter(user =>user.username==username &&user.password==password)
    const use =[ {
        username:username,
        password:password
    }]
    
    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const validate = () =>{

        let trail={
            actor: "",
            action:'',
            time:new Date().toString()
        }

        if(userError=="")setUserError("Please enter a valid username")
        
        if(passwordError=="")setPasswordError("Please enter a valid password")
                       
            if(filteredUser.length&&filteredUser[0].password===password){
                trail ={
                    actor:username,
                    action:'Successfully logged in',
                    time:new Date().toString()
                }
                setCurrentUser(username)
                auditTrail.logTrail(trail)
    
                navigation.navigate('Home');

            }
            else{
                alert('Enter correct credentials please !')
                trail={
                    actor:username,
                    action:'Failed login with password',
                    time:new Date().toString()
                }
    
                auditTrail.logTrail(trail)
            }
    }

    const handleLogin = () => {
        if(fetched.length<1){
            alert('Please restart and login with default username and password')
            insertIfDbEmpty();
        }
        validate();
        setUsername("");
        setPassword("")
      
      
    }
  
        return (
            <SafeAreaView style={styles.container}>
                <View style={{width:'100%',height:'40%',backgroundColor:'white'}} >
                    <View style={{height:120,width:'100%',paddingTop:20,borderRadius:30,backgroundColor:'#B0AAA7',position:'relative',alignItems:'center'}}>
                        <View style={{width:'100%',height:25,backgroundColor:'#827C79',...StyleSheet.absoluteFillObject}}/>
                        <Text style={{fontSize:18,color:'white'}}></Text>
                        <Text style={{fontSize:28,fontWeight:'bold',color:'white'}}>HRMS</Text>
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
                 
               
                    <View style={{width:200,marginLeft:35,height:50}}>
                    <Button 
                    title="Login"
                    color='darkgreen'
                    onPress={handleLogin}
                    />
                    </View>
                 
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

const mapStateToProps = ({ user, staff }) => ({
    currentUser: user.currentUser,
    allS:staff.staff
  });
  
  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(Login);
