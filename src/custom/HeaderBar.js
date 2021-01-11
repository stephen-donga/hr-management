import React from 'react'
import { View, Text,StyleSheet,Dimensions} from 'react-native'
const {width} = Dimensions.get('window');

const HeaderBar = () => {
    return (
        <View style={styles.conatainer}>
            <Text></Text>
        </View>
    )
}

const styles=StyleSheet.create({
    conatainer:{
        width:width,
        height:25,
        backgroundColor:'steelblue'
    }
})

export default HeaderBar
