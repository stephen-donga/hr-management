import React, { useState, useEffect } from 'react'
import {View,Button,Text,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import  {setLoggedIn} from '../redux/user/userAction'
import { Modal, ModalContent } from 'react-native-modals'
import {connect} from  'react-redux'
import {setCurrentUser,setNewUser} from '../redux/user/userAction'
import {setStaff} from '../redux/staff/staffActions'

import Inputfield from '../custom/Inputfield'
import {urlConnection} from '../utils/url'
import auditTrail from '../utils/trails'

const {width, height} = Dimensions.get('window')

const Login = ({navigation,setStaf,setLoggedUser,newUsers,setNewUsers,setCurrentUser}) => {

    const [loading, setLoading] = useState(false)

      const startSpinner = () =>{
          setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            navigation.navigate('Home') 
            setUsername("");
            setPassword("")
            
        },800)
    }
    
    const fetchUsers = () => {
        fetch(urlConnection('new'))
        .then(res =>res.json())
        .then(server=>setNewUsers(server))
        .catch(error=>console.log(error))

        fetch(urlConnection('staff'))
        .then(res =>res.json())
        .then(server=>setStaf(server))
        .catch(error=>console.log(error))
        
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
    const [loginErrorMessage, setLoginErrorMessage]=useState('')
    const [isSeen,setIsSeen]=useState(false)
    
    const filteredUser = newUsers.filter(user =>user.email==username)
    
    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const handleAuth = () =>{
        if(username==""){
            if(userError=="")setUserError("Please enter a valid username")
            return;
        }
        if(password==""){
            if(passwordError=="")setPasswordError("Please enter a valid password")
            return;
        }
        fetch(urlConnection('new/login'),{
            method:'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:username,
                password:password,
            })
        }
        )
        .then(res =>res.json())
        .then(res=>{
            let trail={
                actor: "",
                action:'',
                time:new Date().toString()
            }
            if(res.message===true){
                trail ={
                    actor:username,
                    action:'Successfully logged in',
                    time:new Date().toString()
                }
                
                setCurrentUser(username)
                let user = filteredUser[0]
                setLoggedUser(user)
                setUserError('')
                setPasswordError('')
            
                auditTrail.logTrail(trail)
                startSpinner()
                return;
            }else if(res.message===false){
                setLoginErrorMessage('Wrong password !')
                setIsSeen(true)
    
                trail={
                    actor:username,
                    action:'Failed login with password',
                    time:new Date().toString()
                }
                auditTrail.logTrail(trail)
            }else if(res.message==='none') {
                setLoginErrorMessage('No user with the provided email and password')
                setIsSeen(true)
            }else{
                setLoginErrorMessage('Network failed')
                setIsSeen(true)
            }
        })
        .catch(error=>alert(error))
         
        
    }
  
        return (
            <View style={styles.container}>
                <View style={{position:'absolute',marginTop:'60%',marginLeft:'40%',width:250,height:150,alignItems:'center',justifyContent:'center'}}>
                <Spinner
                    visible={loading}
                    size='large'
                    
                    />
                </View>
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
                    label="Email"
                    icon="user"
                    value={username}
                    message={username ?'':userError}
                    placeholder="email"
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
                        onPress={handleAuth}
                    />
                    </View>
                 
                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                 <TouchableOpacity
                    style={{marginTop:10,height:30,width:150}}
                    onPress={()=>null}
                 >
                   <Text style={{color:'grey',paddingLeft:20,paddingTop:5}}>Forgot password ?</Text>
                 </TouchableOpacity>

                 </View>
               </View>
               <Modal
                    visible={isSeen}
                    onTouchOutside={() => {
                    setLoginErrorMessage('')
                    setIsSeen(!isSeen)
                    }}
                >
                    <ModalContent style={{width:width/2+80,height:height/3+30,backgroundColor:'#fff'}}>
                        <View style={{height:'80%',alignItems:'center',justifyContent:'center',paddingTop:10}}>
                          <Text style={{fontSize:15,alignSelf:'center', fontWeight:'bold',marginBottom:5,color:'red'}}>{loginErrorMessage}</Text>
                        

                        </View>
                    <TouchableOpacity
                    onPress= { ()=>setIsSeen(!isSeen)}
                    style={{alignSelf:'center',width:150,alignItems:'center',justifyContent:'center',height:40,borderRadius:15,borderWidth:1,borderColor:'#eee'}}
                    >
                        <Text style={{fontSize:15}}>Close</Text>
                    </TouchableOpacity>
                </ModalContent>
  </Modal>
            </View>
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
        user_role: user.role,
        allS:staff.staff,
        newUsers:user.newUsers,
  });
  
  const mapDispatchToProps = dispatch => ({
        setCurrentUser: user => dispatch(setCurrentUser(user)),
        setStaf: user => dispatch(setStaff(user)),
        setLoggedUser: user => dispatch(setLoggedIn(user)),
        setNewUsers: user => dispatch(setNewUser(user)),
   
  });

export default connect(mapStateToProps,mapDispatchToProps)(Login);
