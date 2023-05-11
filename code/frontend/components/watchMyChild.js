import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderIcons from './HeaderIcons';

const WatchMyKids = ({ navigation }) => {
    const [kids, setKids] = useState([
        {
            name: 'Kid 1',
            location: 'School',
            departureTime: '08:00',
            arrivalTime: '14:00',
            isArrived: true,
            coordinates: {
                latitude: 37.78825,
                longitude: -122.4324,
            },
        },
        {
            name: 'Kid 2',
            location: 'Home',
            departureTime: '07:45',
            arrivalTime: '15:00',
            isArrived: false,
            coordinates: {
                latitude: 37.7749,
                longitude: -122.4194,
            },
        },
    ]);

    const handleKidPress = (index) => {
        // Code to show kid location on map
    };

    const renderKid = (kid, index) => {
        return (
            <View>
            <TouchableOpacity
                key={index}
                style={styles.kidContainer}
                onPress={() => handleKidPress(index)}
            >
                <View style={styles.kidInfo}>
                    <Text style={styles.kidName}>{kid.name}</Text>
                    <Text style={styles.kidLocation}>{kid.location}</Text>
                    <Text style={styles.kidTime}>
                        {kid.isArrived
                            ? `Arrived at ${kid.arrivalTime}`
                            : `Departed at ${kid.departureTime}`}
                    </Text>
                </View>
                <View
                    style={[
                        styles.kidStatus,
                        kid.isArrived ? styles.kidArrived : styles.kidNotArrived,
                    ]}
                >
                    <Text style={styles.kidStatusText}>
                        {kid.isArrived ? 'Arrived' : 'Not Arrived'}
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <HeaderIcons navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Watch My Kids</Text>
                {kids.map((kid, index) => renderKid(kid, index))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    kidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    kidInfo: {
        flex: 1,
    },
    kidName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    kidLocation: {
        fontSize: 16,
    },
    kidTime: {
        fontSize: 14,
    },
    kidStatus: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    kidArrived: {
        backgroundColor: '#6d9eeb',
    },
    kidNotArrived: {
        backgroundColor: '#e87e8b',
    },
    kidStatusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default WatchMyKids;