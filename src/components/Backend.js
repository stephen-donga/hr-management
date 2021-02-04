import React from 'react'
import { View, Text } from 'react-native'

const Backend = ({first_name,last_name,salaries}) => {
     const back = salaries.filter(j=>j.position=="Backend Engineer")
     
     let bk = back[0]

    return (
        <View style={{width:'90%',alignSelf:'center',padding:10,marginBottom:10,height:50,flexDirection:'row',backgroundColor:'#c1c1c1'}}>
           <View style={{flexDirection:'row',width:'60%',padding:5,borderRightWidth:2}}>
             <Text>{first_name}</Text>
             <Text>{"  "}{last_name}</Text>
               
           </View>
           <View style={{padding:5}}>
               <Text> 1200,000{" "}ugx</Text>
            </View> 
        </View>
    )
}

export default Backend
