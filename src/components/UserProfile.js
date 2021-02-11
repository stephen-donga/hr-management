import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image ,Dimensions, TouchableOpacity} from 'react-native'
import{Entypo} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"
import HeaderBar from '../custom/HeaderBar'
import {connect} from 'react-redux'
import {setIsloggedIn,setImage} from '../redux/user/userAction'
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';



const {width,height} = Dimensions.get('window')

const ViewStaff = ({loggedIn,signdIn,image,userPic,navigation,setLogin}) => {

  const [loading, setLoading] = useState(false)

  const startSpinner = async() =>{
      try{
          setLoading(true)
          setLogin(false)
          setTimeout(()=>{
              setLoading(false)
              navigation.navigate('Login')
          },500)
      }catch(error){
        setLoading(false)
        navigation.navigate('Login')
      }
}

 
const {email, role} = loggedIn;

useEffect(() => {
    
    return () => {
        setLogin(false)
    }
}, [])

useEffect(() => {
    (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    })();
}, []);

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    
    console.log(result);
    
    if (!result.cancelled) {
        userPic(result.uri);
    }
};


    return (
        <View style={styles.container}>
            <HeaderBar />
            <Spinner
                    visible={loading}
                    size='large'
            />
            <View style={{width:width,height:75,backgroundColor:'darkblue',justifyContent:'center',paddingLeft:10}}>
                <Text style={{fontSize:21, fontWeight:'bold', color:'white'}}>Profile</Text>
            </View>
           <View style={styles.topsection}>
              {
                  image?(
                  <TouchableOpacity
                  onPress={pickImage}
                  >
                      <Image source={{uri:image}} style={styles.pic}/>
                  </TouchableOpacity>)
                  :(
                    <TouchableOpacity
                    onPress={pickImage}>
                         <Entypo name="user"  size={130} color="steelblue" />
                  </TouchableOpacity>
                  )
              }
        <View>
        <Text style={{marginTop:30,fontWeight:'bold' ,fontSize:15}}>{email}</Text>
        <Text style={{fontSize:15,alignSelf:'center',marginTop:15}}>{role}</Text>
        </View>
           </View>

           <TouchableOpacity 
           onPress={()=>navigation.navigate('New')}
           >
           <View style={{flexDirection:'row', paddingHorizontal:20}}>
              <View style={{width:'25%',height:50,alignItems:'center',justifyContent:'center'}}>
                <Icon name ="user-plus" size={30} />
              </View>
              <View style={{width:'70%',marginLeft:10,height:50,justifyContent:'center',padding:10}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Create new user</Text>
              </View>
           </View> 
           </TouchableOpacity>

           <TouchableOpacity 
           onPress={startSpinner}
           >
           <View style={{flexDirection:'row', paddingHorizontal:20}}>
              <View style={{width:'25%',height:50,alignItems:'center',justifyContent:'center'}}>
                <Icon name ="log-out" size={30} />
              </View>
              <View style={{width:'70%',marginLeft:10,height:50,justifyContent:'center',padding:10}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Log out</Text>
              </View>
           </View>
           </TouchableOpacity> 
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
        backgroundColor:'white'
    },
    topsection:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:width,
        height:height/3,
        alignItems:'center',
        padding:20,
        backgroundColor:'#D3C0D4',
        position:'relative'
    },
    pic:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:2,
        borderColor:'grey'
    }

})

const mapStateToProps = ({user})=>({
    loggedIn:user.loggedIn,
    signdIn: user.isSignedIn,
    image:user.userPic
})

const mapDispatchToProps = dispatch=>({
    setLogin: action =>dispatch(setIsloggedIn(action)),
    userPic: action =>dispatch(setImage(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewStaff) 
