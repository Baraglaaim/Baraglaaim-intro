import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';

const LoginPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        handleLogin(email, password);
    };

    return (
        <View>
            <Text style={[styles.title, styles.width]}>Login to Your Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                maxLength={50} // set maxLength to the number of characters that fit in the box
                numberOfLines={1} // set numberOfLines to 1 to keep the box size fixed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    width:{
        width: '50%' 
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
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        height: 40, // set a fixed height
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
});

export default LoginPage;
