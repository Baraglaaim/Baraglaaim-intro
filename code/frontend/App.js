import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/LoginPage'; // import LoginPage component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ChildComponent from './components/ChildComponent';

const Stack = createStackNavigator();


export default function App() {
  const handleLogin = (email, password) => {
    // Handle login logic here
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (

    <View style={styles.page} >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Profile" component={ChildComponent} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* Render LoginPage component */}
      <LoginPage />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
