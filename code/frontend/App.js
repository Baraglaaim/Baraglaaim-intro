import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'; // import RegisterPage component
import HomeScreen from './components/HomeScreen';
import HeaderIcons from './components/HeaderIcons';
import AddChild from './components/AddChild';
import WatchMyChilds from './components/WatchMyChilds';
import JoinCommunity from './components/JoinCommunity';
import CreateCommunity from './components/CreateCommunity';

const Stack = createStackNavigator();


function AppStack() {
  return (
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
      <Stack.Screen
        name="HeaderIcons"
        options={{ title: 'Home' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="JoinCommunity"
        options={{ title: 'Join Community' }}
        component={HeaderIcons}
      />
      <Stack.Screen
        name="CreateCommunity"
        options={{ title: 'Create Community' }}
        component={HeaderIcons}
      />
      <Stack.Screen
        name="WatchMyChilds"
        options={{ title: 'Watch My Childs' }}
        component={WatchMyChilds}
      />
      <Stack.Screen
        name="AddChild"
        options={{ title: 'Add Child' }}
        component={AddChild}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
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
