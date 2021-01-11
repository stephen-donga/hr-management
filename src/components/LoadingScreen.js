import React,{useEffect } from 'react'
import { View, Text,StyleSheet , Dimensions} from 'react-native'


const {width,height} = Dimensions.get('window');
const LoadingScreen = ({navigation}) => {

    const home = ()=>{
     navigation.navigate('Login');

    } 

    useEffect(()=>{
        setTimeout(home,3000)
    },[])
    return (
        <View style={styles.conatiner}>
            <View style={{width:width,height:25,backgroundColor:'#B49F93'}}></View>
            <View style={styles.topsection}>

            </View>
            <View style={styles.midsection}>
                <Text style={{fontSize:50,color:'#305285',fontWeight:"bold"}}>HRM</Text>

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
        marginTop:150,
        marginLeft:width/2-80,
        borderRadius:50,
        borderWidth:5,
        borderColor:'#B49F93',
        alignItems:'center',
        justifyContent:'center',
        padding:10

    }
    
})

export default LoadingScreen
