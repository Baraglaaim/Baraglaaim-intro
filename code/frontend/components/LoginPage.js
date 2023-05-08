import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const LoginPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        handleLogin(email, password);
    };

    return (
        <View>
            <Text style={styles.header}>ברגליים - נעים ללכת בעיר </Text>
            <Text style={styles.userDetails}>שם משתמש</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
            <Text style={styles.userDetails}>סיסמא</Text>
            <TextInput
                style={[styles.input, styles.marginBottom]}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
            <TouchableOpacity onPress={handlePress}>
                <Text style={{ fontSize: 15, color: '#AD40AF', marginBottom: 10 }}>שכחת סיסמא?</Text>
            </TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
    userDetails: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'boldest',
        // paddingBottom: 20,
        color: '#1AA945',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 10,
        height: 10,
        // marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',

    },
    marginBottom: {
        marginBottom: 20,
    }
});

export default LoginPage;
