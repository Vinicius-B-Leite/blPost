import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login'
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    );
}