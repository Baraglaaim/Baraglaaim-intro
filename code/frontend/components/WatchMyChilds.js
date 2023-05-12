import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Linking,
    Platform,
    FlatList,
} from 'react-native';
import HeaderIcons from './HeaderIcons';
import { ToastAndroid } from 'react-native';

const childrenData = [
    {
        name: 'דניאל',
        location: 'היובל',
        departureTime: '08:00',
        arrivalTime: '08:30',
        isArrived: true,
        coordinates: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
    },
    {
        name: 'רוני',
        location: 'גוננים',
        departureTime: '07:45',
        arrivalTime: '08:00',
        isArrived: false,
        coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
        },
    },
    {
        name: 'יחיאל',
        location: 'ממלכתי א',
        departureTime: '07:55',
        arrivalTime: '08:10',
        isArrived: true,
        coordinates: {
            latitude: 123.7749,
            longitude: -102.322,
        },
    },
];

const WatchMyChilds = ({ navigation }) => {
    const [selectedKidIndex, setSelectedKidIndex] = useState(-1);
    const handleKidPress = useCallback(
        (index) => {
            setSelectedKidIndex(index);
            // Code to show kid location on map
            Alert.alert(
                'התראה',
                `אתה מנסה לצפות במיקום של ${childrenData[index].name}. האם אתה רוצה לפנות להורה המלווה?`,
                [
                    {
                        text: 'כן',
                        onPress: () => {
                            ToastAndroid.show(`אתה מנסה לצפות במיקום של ${childrenData[index].name}. האם אתה רוצה לפנות למלווה ההורים?`, ToastAndroid.LONG);
                        },
                    },
                    {
                        text: 'לא',
                        style: 'cancel',
                    },
                ],
            );
        },
        [setSelectedKidIndex],
    );

    const renderKid = useCallback(
        ({ item: { name, location, departureTime, arrivalTime, isArrived, coordinates }, index }) => {
            return (
                <TouchableOpacity
                    style={[
                        styles.kidContainer,
                        selectedKidIndex === index && styles.selectedKidContainer,
                    ]}
                    onPress={() => handleKidPress(index)}>
                    <Text style={styles.kidName}>{name}</Text>
                    <Text style={styles.kidLocation}>{location}</Text>
                    <Text style={styles.kidTime}>
                        {isArrived ? `הגיע ב${arrivalTime}:יצא ב${departureTime}` : `יצא ב${departureTime}`}
                    </Text>
                    {!isArrived && (
                        <TouchableOpacity
                            style={styles.viewOnMapButton}
                            onPress={() => {
                                // Code to show kid location on map
                            }}>
                            <Text style={styles.viewOnMapButtonText}>צפה במפה</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            );
        },
        [handleKidPress, selectedKidIndex],
    );
    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.title}>צפה בילד שלי</Text>
            <FlatList
                data={childrenData}
                renderItem={renderKid}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.kidsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    kidsList: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    kidContainer: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    selectedKidContainer: {
        borderColor: '#00f',
    },
    kidName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    kidLocation: {
        fontSize: 16,
        marginBottom: 5,
    },
    kidTime: {
        fontSize: 16,
    },
    viewOnMapButton: {
        backgroundColor: '#00f',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    viewOnMapButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default WatchMyChilds;