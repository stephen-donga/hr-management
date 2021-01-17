import React from 'react'
import { View, Text,TextInput, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FormInput from '../custom/FormInput'
import HeaderBar from '../custom/HeaderBar'

const {width, height} = Dimensions.get('window')
const AddEvent = () => {
    return (
        <View style={{width:width}}>
            <HeaderBar />
           <View style={{width:'100%',alignItems:'center', marginTop:5}}>
               <Text style={{fontSize:25,fontWeight:'bold',marginBottom:25}}>Add an event</Text>
               <FormInput 
               placeholder="Event name"
               label='Event Name'
               />
           <View>
           <Text style={{marginTop:15,fontSize:17,}}>Description</Text>
            <TextInput 
            multiline={true}
            style={{
                width:width/2+150,
                height:height/3,
                backgroundColor:'white',
                marginTop:10,borderWidth:1,
                borderColor:'black',
                borderRadius:5,
                fontSize:20,
                padding:5
                
            }}
            />
             <TouchableOpacity 
           style={{width:'100%',height:40,marginTop:20,backgroundColor:'darkblue',alignItems:'center',justifyContent:'center'}}
           >
               <Text style={{fontSize:17,color:'white'}}>Add</Text>
           </TouchableOpacity>
           </View>
          
           </View>
        </View>
    )
}

export default AddEvent
