import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'; // import RegisterPage component
import HomeScreen from './components/HomeScreen';


const Stack = createStackNavigator();

export default function App() {
  const handleLogin = (email, password) => {
    // Handle login logic here
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          options={{ title: 'Login' }}
          component={LoginPage}
        />
        <Stack.Screen
          name="RegisterPage"
          options={{ title: 'Register' }}
          component={RegisterPage}
        />
        <Stack.Screen
          name="HomeScreen"
          options={{ title: 'Home' }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
