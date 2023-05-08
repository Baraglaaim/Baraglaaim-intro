import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';

function SignupPage() {
    const SignupPage = ({ handleSignup }) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handlePress = () => {
            handleSignup(email, password);
        };

        return (
            <View>
                <Text style={styles.title}>Signup to Your Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
        );
    };
}
const styles = StyleSheet.create({
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
        width: '80%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default SignupPage;
