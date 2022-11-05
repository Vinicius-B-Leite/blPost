import React, { useContext } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/auth';

export default function Routes() {

    const {isLogin, loadingLogin} = useContext(AuthContext)

    if (loadingLogin){
        return(
            <View style={{backgroundColor: '#36393f', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={50} color='#e52246'/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#36393f'}  barStyle='light-content' translucent={false}/>
            {isLogin ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}