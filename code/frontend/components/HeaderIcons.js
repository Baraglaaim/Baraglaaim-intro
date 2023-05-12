import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { footstepsOutline } from 'ionicons/icons';
const HeaderIcons = ({ navigation }) => {
    return (
        <View style={styles.navigationBar}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('JoinCommunity')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="school-outline" size={30} color="black" />
                        <Text style={styles.iconText}>הצטרף לקהילה</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CreateCommunity')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="walk-outline" size={30} color="black" />
                        <Text style={styles.iconText}>קבוצות הליכה</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('WatchMyChilds')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="people-outline" size={30} color="black" />
                        <Text style={styles.iconText}>צפה בילדים שלי</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddChild')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="person-add-outline" size={30} color="black" />
                        <Text style={styles.iconText}>הוסף ילד</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="log-out-outline" size={30} color="black" />
                        <Text style={styles.iconText}>התנתק</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default HeaderIcons;
