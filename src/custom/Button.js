import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({title,pressHandler}) => {

    return (
        <View  >
           <TouchableOpacity
            style={styles.button}
            onPress={pressHandler}
           >
              <Text style={styles.text}>{title}</Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width:180,
        padding:8,
        backgroundColor:'mediumaquamarine',
        borderRadius:15,
        borderWidth:0,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15,

    },
    text:{
        color:'white',
        fontSize:18
    }
})

export default Button
