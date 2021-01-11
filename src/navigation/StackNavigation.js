import {createStackNavigator} from "@react-navigation/stack"

import BottomTabs from '../navigation/BottomTabNavigation'
import Login from '../components/Login'

const Stack = createStackNavigator()

const StackNavigation = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
    )
}

export default StackNavigation;