import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Buttons from './Buttons';
import kidsImage from '../assets/kidsWalking.jpg';
import { ImageBackground } from 'react-native';
const LoginPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        handleLogin(email, password);
    };

    return (
        <View>
            <Text style={styles.header}>ברגליים - נעים ללכת בעיר</Text>
            <Text style={styles.userDetails}>שם משתמש</Text>
            <TextInput
                style={styles.input}
                placeholder="הכנס שם משתמש"
                value={email}
                onChangeText={setEmail}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
            <Text style={styles.userDetails}>סיסמא</Text>
            <TextInput
                style={[styles.input, styles.marginBottom]}
                placeholder="הכנס סיסמא"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
            <Buttons color='#4C8BCA' width={150} onPress={() => navigation.navigate('HomeScreen')} title='התחבר' />
            <Buttons color='blue' width={150} press={() => console.log('signup button pressed')} title='הירשם' />

            <TouchableOpacity onPress={handlePress}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#AD40AF', marginBottom: 10 }}>
                    שכחתי סיסמא
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
            <Text style={styles.footerText}>
                ©All rights reserved- Jerusalem Municipality
            </Text>
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
    }, image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '130%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginPage;
