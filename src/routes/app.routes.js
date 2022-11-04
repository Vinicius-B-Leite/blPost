import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'

const Tabs = createBottomTabNavigator()
export default function AppRoutes() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Home' component={Home} />
            <Tabs.Screen name='Search' component={Search} />
            <Tabs.Screen name='Profile' component={Profile} />
        </Tabs.Navigator>
    );
}