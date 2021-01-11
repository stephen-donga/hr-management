import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"

import HomeScreen from "../components/HomeScreen"

const BottomTab  = createMaterialBottomTabNavigator();

const BottomTabs = () =>{
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name="users" component={HomeScreen}/>
        </BottomTab.Navigator>
    )
}

export default BottomTabs;