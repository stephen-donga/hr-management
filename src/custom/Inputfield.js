import React from 'react'
import { View,Text, TextInput, StyleSheet } from 'react-native'
import {Feather as Icon } from "@expo/vector-icons";

const Inputfield = ({placeholder,icon,type,textEntry,message,changeHandler,label,...otherProps}) => {

    return (
        <View >
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
            <Icon name= {icon} size={18}/>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                keyboardType={type}
                secureTextEntry={textEntry}
                onChangeText={changeHandler}
                {...otherProps}

            />
        </View>
        <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:250,
        alignItems:'center',
        justifyContent:"space-evenly",
        borderWidth:1,
        borderRadius:5,
        marginBottom:5,
        padding:5
    },
    input:{
        width:200,
        paddingHorizontal:20,
        fontSize:18

    },
    text:{
        fontSize:15,
        marginBottom:10,
        color:'red',
        paddingLeft:5

    },
    label:{
        fontSize:18
    }
})

export default Inputfield
