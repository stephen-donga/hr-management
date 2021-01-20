import React from 'react'
import { View,StyleSheet,Image, Text,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import {setDetails,detailsAdd} from '../redux/showUserDetails/detailsActions'

const UserCard = ({first_name,last_name,id,date_of_birth,position,qualification,experience,showDetails,setDetails,addDetails,image}) => {

    
    const handlePress =()=>{
        let detail ={
            first_name,
            last_name,
            position,
            id,
            date_of_birth,
            qualification,
            experience,
            image
        }
        
            addDetails(detail)
            setDetails(!showDetails)
    }
    return (
            <TouchableWithoutFeedback 
                onPress={()=>setDetails(showDetails?!showDetails:null)}
                >
            <View style={styles.container}>
                
                <View style={{flexDirection:'row',flex:1,paddingLeft:5}}>
                    <View style={{width:'35%',height:'90%',alignSelf:'center' ,margin:5}}>
                        <Image source={{uri:image}} style={{ alignSelf:'center',width: 110, height: 110,borderRadius:60,borderWidth:3,borderColor:'grey' }}/>
                    </View>

                    <View style={{width:'50%',height:'90%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>{first_name}{" "}{last_name}</Text>
                        <Text style={{fontSize:14,color:'steelblue'}}>{position}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handlePress}
                        style={{width:'10%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Icon name='more-vertical' size={30}/>
                    </TouchableOpacity>

                </View>
                </View>
                </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    container:{
        height:130,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:'whitesmoke',
        borderWidth:1,
        borderColor:'grey'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})
const mapStateToProps = ({details}) => ({
    showDetails:details.showDetails
 });

const mapDispatchToProps = dispatch => ({
    setDetails: act =>dispatch(setDetails(act)),
    addDetails: obj =>dispatch(detailsAdd(obj))

  });
export default connect(mapStateToProps,mapDispatchToProps)(UserCard)
