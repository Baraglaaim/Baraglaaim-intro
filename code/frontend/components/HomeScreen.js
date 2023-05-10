import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Buttons from './Buttons';
import kidsImage from '../assets/kidsWalking.jpg';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ברוך הבא Username!</Text>
                <Image source={kidsImage} style={styles.logo} />
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>נעים ללכת בעיר</Text>
                <Text style={styles.description}>הצטרפו להליכות, צרו קשרים עם חברים.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    link: {
        fontSize: 16,
        color: '#4C8BCA',
        textDecorationLine: 'underline',
    },
});

export default HomeScreen;
