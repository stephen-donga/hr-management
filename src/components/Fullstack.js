import React from 'react'
import { View, Text } from 'react-native'

const Fullstack = ({first_name,last_name,salaries}) => {
     const ful = salaries.filter(j=>j.position=="Fullstack Developer")
     let fu = ful[0]

    return (
        <View style={{width:'90%',alignSelf:'center',padding:10,marginBottom:10,height:50,flexDirection:'row',backgroundColor:'#c1c1c1'}}>
           <View style={{flexDirection:'row',width:'60%',padding:5,borderRightWidth:2}}>
             <Text>{first_name}</Text>
             <Text>{"  "}{last_name}</Text>
               
           </View>
           <View style={{padding:5}}>
               <Text>{fu.gross_pay}{" "}ugx</Text>
            </View> 
        </View>
    )
}

export default Fullstack
