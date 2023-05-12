import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';

function WalkingGroups({ navigation }) {
    const [name, setName] = useState('');
    const [maxKids, setMaxKids] = useState(0);
    const [minKids, setMinKids] = useState(0);
    const [manager, setManager] = useState('');
    const [startPoint, setStartPoint] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send data to the server to create a new Walking Group
    };

    const handleJoin = (event) => {
        event.preventDefault();
        // Send data to the server to join an existing Walking Group
    };

    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text>Create or Join a Walking Group</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Name of Walking Group" />
            <TextInput value={maxKids.toString()} onChangeText={(text) => setMaxKids(Number(text))} placeholder="Max Number of Walking Kids" />
            <TextInput value={minKids.toString()} onChangeText={(text) => setMinKids(Number(text))} placeholder="Min Number of Walking Kids" />
            <TextInput value={manager} onChangeText={(text) => setManager(text)} placeholder="Name of Group Manager" />
            <TextInput value={startPoint} onChangeText={(text) => setStartPoint(text)} placeholder="Place of Walking Start Point" />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Create Walking Group</Text>
            </TouchableOpacity>
            <Text>Join an Existing Walking Groups</Text>
            <TouchableOpacity onPress={handleJoin}>
                <Text>Join Walking Group</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default WalkingGroups;
