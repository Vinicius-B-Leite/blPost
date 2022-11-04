import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/auth';

export default function Routes() {

    const {isLogin} = useContext(AuthContext)

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#36393f'}  barStyle='light-content' translucent={false}/>
            {isLogin ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}