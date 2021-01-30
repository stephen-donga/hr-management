import React from 'react'
import { View, Text } from 'react-native'

const PayCard = ({first_name,last_name,salaries}) => {
     const intr = salaries.filter(i =>i.position=="Intern Developer")
     let intrn = intr[0]

    return (
        <View style={{width:'90%',alignSelf:'center',padding:10,marginBottom:10,height:50,flexDirection:'row',backgroundColor:'#c1c1c1'}}>
           <View style={{flexDirection:'row',width:'60%',padding:5,borderRightWidth:2}}>
             <Text>{first_name}</Text>
             <Text>{"  "}{last_name}</Text>
               
           </View>
           <View style={{padding:5}}>
               <Text>{intrn.gross_pay}{" "}ugx</Text>
            </View> 
        </View>
    )
}

export default PayCard
