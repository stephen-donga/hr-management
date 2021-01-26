import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text ,StyleSheet ,Dimensions,TouchableOpacity} from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'; 



const {width} = Dimensions.get('window')

const Card = ({title, icon,screen}) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
        onPress={()=>navigation.dispatch(StackActions.push(screen))} 
        >
             <View style={styles.container}>
             <View style={styles.icon}>
                 <View style={styles.iconview}>
                    <Icon name={icon} size={45} color='steelblue' />
                 </View>
             </View>
             <View style={styles.text}>
                 <Text style={styles.word}>{title}</Text>
            </View>
        </View>
        </TouchableOpacity>
       
    )
}

const styles = StyleSheet.create({
    container:{
        width:width/2-20,
        height:120,
        borderRadius:360,
        margin:10,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        shadowOpacity:0.34,
        elevation:5, 
        backgroundColor:'white',
        borderRadius:5
    },
    icon:{
        width:'100%',
        height:'80%'
    },
    iconview:{
        flex:1,
        alignItems:'center',
        justifyContent:'center', 
        padding:5,
    },
    text:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
        alignItems:'center',
        padding:5
    },
    word:{
        fontSize:15,
        fontWeight:'bold',
        color:'teal',
        marginBottom:10
    }
})

export default Card;
