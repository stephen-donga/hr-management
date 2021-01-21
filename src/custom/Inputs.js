import React from 'react'
import { View, Text,StyleSheet,TextInput,Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

const FormInput = ({label,placeholder,changeHandler,type,textEntry, message}) => {
    return (
        <View style={styles.container} >
            <Text style={styles.label}>{label}</Text>
            <TextInput 
              style={styles.input}
              placeholder={placeholder}
              onChangeText={changeHandler}
              keyboardType={type}
              secureTextEntry={textEntry}
              
            />
            <Text style={styles.error}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width/2+150,
        height:60,
        marginBottom:10,
        marginTop:10
    },
    input:{
        width:width/2+120,
        height:30,
        borderBottomWidth:1,
        borderColor:'#ccc',
        paddingLeft:5
    },
    label:{
        fontSize:17,
        color:'teal'
    },
    error:{
        fontSize:14,
        color:'red'
    }
})

export default FormInput
