import React from 'react'
import {Feather as Icon } from "@expo/vector-icons"
import { View, Text,StyleSheet,Dimensions ,TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');

const DrawerHeader = ({toggler,middleIcon,lastIcon,heading}) => {
    return (
        <View style={styles.container}>
            <View style={styles.drawertoggle}>
                <TouchableOpacity 
                    onPress={toggler}
                    style={styles.menuIcon}
                >
                    <Icon name='menu' size={25} />
                </TouchableOpacity>
                

            </View>
            <View style={styles.heading}>
                {
                    middleIcon ?(<Icon name={middleIcon} size={24}/>) :(<Text style={{fontSize:17,fontWeight:'bold'}}>{heading}</Text>)
                }

            </View>
            <View style={styles.leftSection}>
                <Icon name={lastIcon} color='grey'size={24}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:width,height:40,
        backgroundColor:'lavender',
        justifyContent:'space-between',alignItems:'center'
    },
    drawertoggle:{
        width:width/5,
        height:50,
        justifyContent:'center'
    },
    heading:{
        width:width/2,
        alignItems:'center',
        justifyContent:'center',
        height:50
    },
    leftSection:{
        width:width/5,
        alignItems:'center',
        justifyContent:'center',
        height:50
        
    },
    menuIcon:{
        width:'100%',height:30,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default DrawerHeader
