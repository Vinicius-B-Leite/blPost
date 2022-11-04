import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import AuthContextProvider from './src/contexts/auth';
import Routes from './src/routes/';

const App = () => {

  return (
    <AuthContextProvider>
      <Routes/>
    </AuthContextProvider>
  );
};


export default App;
