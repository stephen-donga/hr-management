import React from 'react'
import { View, Text,StyleSheet,TextInput,Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

const FormInput = ({label,placeholder,changeHandler,type, message,...otherProps}) => {
    return (
        <View style={styles.container} >
            <Text style={styles.label}>{label}</Text>
            <TextInput 
              style={styles.input}
              placeholder={placeholder}
              onChangeText={changeHandler}
              keyboardType={type}
              {...otherProps}
              
            />
            <Text style={styles.error}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width/2+150,
        height:60,
        marginBottom:20,
        marginTop:10
    },
    input:{
        width:width/2+150,
        height:50,
        borderBottomWidth:1,
        borderColor:'teal',
        paddingLeft:5
    },
    label:{
        fontSize:17
    },
    error:{
        fontSize:14,
        color:'red'
    }
})

export default FormInput
