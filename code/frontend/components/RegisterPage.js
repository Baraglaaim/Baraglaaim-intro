import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import Buttons from './Buttons';
import kidsImage from '../assets/kidsWalking.jpg';
import { ImageBackground } from 'react-native';

const RegisterPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegistration = () => {
        // Handle registration logic here
        console.log('Registering with username:', username, 'email:', email, 'password:', password);
        // navigate to LoginPage after registration process is complete
        navigation.navigate('LoginPage');
    };

    return (
        <ImageBackground source={kidsImage} style={styles.image}>
            <View style={styles.overlay}>
                <View>
                    <Text style={styles.header}>ברגליים - נעים ללכת בעיר</Text>
                    <Text style={styles.userDetails}>שם משתמש</Text>
                    <TextInput
                        style={[styles.input, { color: 'white' }]} // updated style with color property
                        placeholder="הכנס שם משתמש"
                        value={username}
                        onChangeText={setUsername}
                        maxLength={50} // set maxLength to the number of characters that fit in the box
                        numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
                    />
                    <Text style={styles.userDetails}>כתובת אימייל</Text>
                    <TextInput
                        style={[styles.input, { color: 'white' }]} // updated style with color property
                        placeholder="הכנס אימייל"
                        value={email}
                        onChangeText={setEmail}
                        maxLength={50} // set maxLength to the number of characters that fit in the box
                        numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
                    />
                    <Text style={styles.userDetails}>סיסמא</Text>
                    <TextInput
                        style={[styles.input, { color: 'white' }]} // updated style with color property
                        placeholder="הכנס סיסמא"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        maxLength={50} // set maxLength to the number of characters that fit in the box
                        numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
                    />
                    <Text style={styles.userDetails}>אימות סיסמא</Text>
                    <TextInput
                        style={[styles.input, styles.marginBottom, { color: 'white' }]} // updated style with color property
                        placeholder="הכנס סיסמא שוב"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        maxLength={50} // set maxLength to the number of characters that fit in the box
                        numberOfLines={1} // set numberOfLines to 1 to keep the box sizefixed
                    />
                    <Buttons
                        title="הירשם"
                        color="#AD40AF"
                        width={150}
                        press={handleRegistration}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userDetails: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlign: 'right', // Set text direction to right-to-left
    },
    marginBottom: {
        marginBottom: 40,
    },
});

export default RegisterPage;