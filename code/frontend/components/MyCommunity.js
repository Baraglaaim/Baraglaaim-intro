import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/FontAwesome';


const MyCommunity = ({ navigation }) => {
    const [name, setName] = useState('');

    return (
        <View>
            <HeaderIcons navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>הצטרף לקהילה</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
});

export default MyCommunity;