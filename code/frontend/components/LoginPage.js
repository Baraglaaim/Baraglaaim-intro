import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ImageBackground } from 'react-native';
import Buttons from './Buttons';
import kidsImage from '../assets/kidsWalking.jpg';

const LoginPage = ({ navigation }) => {
    const handleLogin = (email, password) => {
        // Handle login logic here
        //if it's correct, navigate to HomeScreen
        //TODO: login logic here
        navigation.navigate('HomeScreen');

    };

    return (
        <View>
            <Text style={styles.header}>ברגליים - נעים ללכת בעיר</Text>
            <Text style={styles.userDetails}>שם משתמש</Text>
            <TextInput
                style={styles.input}
                placeholder="הכנס שם משתמש"
                maxLength={50}
                numberOfLines={1}
            />
            <Text style={styles.userDetails}>סיסמא</Text>
            <TextInput
                style={[styles.input, styles.marginBottom]}
                placeholder="הכנס סיסמא"
                secureTextEntry={true}
                maxLength={50}
                numberOfLines={1}
            />
            <Buttons
                title="התחבר"
                color="#AD40AF"
                width={150}
                press={handleLogin}
            />
            <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#AD40AF', marginBottom: 10 }}>
                    אין לך חשבון? הרשם עכשיו
                </Text>
            </TouchableOpacity>
            <ImageBackground source={kidsImage} style={styles.image}></ImageBackground>
            <Footer />
        </View >
    );
};

function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    userDetails: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1AA945',
        marginTop: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 300,
        height: 50,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
    },
    marginBottom: {
        marginBottom: 20,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '130%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#AD40AF',
        borderRadius: 10,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginPage;
