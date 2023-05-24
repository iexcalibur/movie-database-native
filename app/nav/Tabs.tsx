import { View,Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import List from '../screens/List'
import Settings from '../screens/Settings'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import {Ionicons} from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetails from '../screens/MovieDetails'

//Type safety for ListStack
export type ListStackParamList = {
    List: undefined;
    MovieDetails: {id: string};
}

const ListStack = createNativeStackNavigator<ListStackParamList>();

const ListStackScreen = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })

    return (
        <ListStack.Navigator>
            <ListStack.Screen name='List' options={{ title: 'Movie Search'}} component={List} />
            <ListStack.Screen name='MovieDetails' options={{ title: '',headerBackTitle:''}} component={MovieDetails} />
        </ListStack.Navigator>
    )
}

//Type safety for TabsList
type TabsParamList = {
    ListStack: undefined;
    Settings: undefined;
}

const Tab = createBottomTabNavigator<TabsParamList>()

const Tabs = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='ListStack' 
                component={ListStackScreen} 
                options={{tabBarLabel: 'Movie List' , tabBarIcon:({color,size}) => <Ionicons name='list' size={size} color={color} />}}
            />
            <Tab.Screen 
                name='Settings' 
                component={Settings}
                options={{tabBarLabel: 'Settings' , tabBarIcon:({color,size}) => <Ionicons name='settings-outline' size={size} color={color} /> }}
            />
        </Tab.Navigator>
    )
}

export default Tabs

