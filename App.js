import React from 'react';

import { UserProvider } from './components/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import DrawerNavigator from './navigation/DrawerNavigator'; // Import your DrawerNavigator
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';


export default function App() {
 
  // isAuthenticated = is...
  const isAuthenticated = true;

  return (
    <NativeBaseProvider>
      
      <UserProvider>
        <NavigationContainer>
        <StatusBar style="dark" />
          {isAuthenticated ? <AuthNavigator /> : <DrawerNavigator />}
        </NavigationContainer>
      </UserProvider>
    </NativeBaseProvider>
  );
}

