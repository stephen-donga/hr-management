import React,{useEffect } from 'react'
import { View, Text,StyleSheet , Dimensions} from 'react-native'


const {width,height} = Dimensions.get('window');
const LoadingScreen = ({navigation}) => {

    const home = ()=>{
     navigation.navigate('Login');

    } 

    useEffect(()=>{
        setTimeout(home,2000)
    },[])
    return (
        <View style={styles.conatiner}>
            <View style={{width:width,height:25,backgroundColor:'#B49F93'}}></View>
            <View style={styles.topsection}>

            </View>
            <View style={styles.midsection}>
                <Text style={{fontSize:40,color:'#305285',fontWeight:"bold"}}>HRMS</Text>

            </View>

            <View style={styles.lowersection}>

            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        width:width,
        height:height,
    },
    topsection:{
        width:width,
        height:height/2-50,
        backgroundColor:'#B8ABA3',
        position:'relative',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
    },
    lowersection:{
        width:width,
        height:height/2,
    },
    midsection:{
        position:'absolute',
        width:width/2,
        height:height/3,
        backgroundColor:'white',
        marginTop:height/2-150,
        alignSelf:'center',
        borderRadius:50,
        borderWidth:5,
        borderColor:'#B49F93',
        alignItems:'center',
        justifyContent:'center',
        padding:10

    }
    
})

export default LoadingScreen
