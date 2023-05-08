import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Buttons from './components/Buttons';
import LoginPage from './components/LoginPage'; // import LoginPage component
import SignupPage from './components/SignupPage';
import kidsImage from './assets/kidsWalking.jpg';

export default function App() {
  const handleLogin = (email, password) => {
    // Handle login logic here
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (
    
      <ImageBackground source={kidsImage} style={styles.image}>
      {/* Render LoginPage component */}
      <LoginPage/>
      <Buttons color='red' press={() => console.log('login button pressed')} title='Login' />
      <Buttons color='blue' press={() => console.log('signup button pressed')} title='Signup' />
      <StatusBar style="auto" />
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
