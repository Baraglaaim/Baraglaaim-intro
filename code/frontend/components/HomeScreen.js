import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>This is the home screen.</Text>
            <Button title="Go to profile" onPress={() => navigation.navigate('ChildComponent')} />
        </View>
    );
};

export default HomeScreen;
