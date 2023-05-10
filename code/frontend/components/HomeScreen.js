import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderIcons from './HeaderIcons';

// const handleHomeScreen = () => {

// };

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;
