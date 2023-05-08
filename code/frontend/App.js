import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Buttons from './components/Buttons';
import LoginPage from './components/LoginPage'; // import LoginPage component
import kidsImage from './assets/kidsWalking.jpg';
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
      <Buttons color='#4C8BCA' width={150} onPress={() => navigation.navigate('HomeScreen')} title='התחבר' />
      <Buttons color='blue' width={150} press={() => console.log('signup button pressed')} title='הירשם' />
      <ImageBackground source={kidsImage} style={styles.image}></ImageBackground>
      {/* <StatusBar style="auto" /> */}
      <Footer />
    </View>
  );
}


function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        <small>©All rights reserved- Jerusalem Municipality</small>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
