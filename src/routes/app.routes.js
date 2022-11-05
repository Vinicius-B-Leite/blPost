import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import PostsUsers from '../screens/PostsUsers'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tabs = createBottomTabNavigator()
const stack = createNativeStackNavigator()

function StackRoutes(){
    return(
        <stack.Navigator>
            <stack.Screen 
                name='Home' 
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <stack.Screen 
                name='NewPost' 
                component={NewPost}
                options={{
                    title: 'Novo Post',
                    headerTintColor: '#fff',
                    headerStyle:{
                        backgroundColor: '#36393f'
                    }
                }}
            />
            <stack.Screen 
                name='PostsUsers' 
                component={PostsUsers}
                options={{
                    headerTintColor: '#fff',
                    headerStyle:{
                        backgroundColor: '#36393f'
                    }
                }}
            />
        </stack.Navigator>
    )
}

export default function AppRoutes() {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#202225',
                borderTopWidth: 0
            },
        }}>

            <Tabs.Screen
                name='StackRoutes'
                component={StackRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="home" color={color} size={size} solid />
                    }
                }} />
            <Tabs.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="search" color={color} size={size} solid />
                    }
                }} />
            <Tabs.Screen 
                name='Profile' 
                component={Profile}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <FontAwesome5 name="user" color={color} size={size} solid/>
                    }
                }} />
        </Tabs.Navigator>
    );
}