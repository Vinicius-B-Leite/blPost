import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tabs = createBottomTabNavigator()
export default function AppRoutes() {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false, 
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#202225',
                borderBottomWidth: 0},
            }}>

            <Tabs.Screen 
                name='Home' 
                component={Home}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <FontAwesome icon="fa-solid fa-house" style={{color: '#fff', fontSize: size}} />
                    }
                }} />
            <Tabs.Screen name='Search' component={Search} />
            <Tabs.Screen name='Profile' component={Profile} />
        </Tabs.Navigator>
    );
}