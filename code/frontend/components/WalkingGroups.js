
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';

const WalkingGroups = ({ navigation }) => {
    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupManager, setGroupManager] = useState('');
    const [groupMinKids, setGroupMinKids] = useState('');
    const [groupMaxKids, setGroupMaxKids] = useState('');
    const [groupManagerPhone, setGroupManagerPhone] = useState('');
    const [groupManagerEmail, setGroupManagerEmail] = useState('');
    const [groupManagerAddress, setGroupManagerAddress] = useState('');
    const [groupUserChildName, setGroupUserChildName] = useState('');
    const [groupUserChildPhone, setGroupUserChildPhone] = useState('');
    const [groupUserChildAge, setGroupUserChildAge] = useState('');
    const [walkingGroups, setWalkingGroups] = useState([]);

    const createWalkingGroup = () => {
        const newWalkingGroup = {
            groupName,
            groupManager,
            groupMinKids,
            groupMaxKids,
            groupManagerPhone,
            groupManagerEmail,
            groupManagerAddress,
            groupUserChildName,
            groupUserChildPhone,
            groupUserChildAge
        };
        setWalkingGroups([...walkingGroups, newWalkingGroup]);
        setShowForm(false);
        // Reset form data
        setGroupName('');
        setGroupManager('');
        setGroupMinKids('');
        setGroupMaxKids('');
        setGroupManagerPhone('');
        setGroupManagerEmail('');
        setGroupManagerAddress('');
        setGroupUserChildName('');
        setGroupUserChildPhone('');
        setGroupUserChildAge('');
    };

    const readWalkGroup = () => {
        // Code to read a walking group
    };

    const updateWalkingGroup = () => {
        // Code to update a walking group
    };

    const deleteWalkingGroup = () => {
        // Code to delete a walking group
    };

    return (
        <View>
            <HeaderIcons navigation={navigation} />
            <View style={styles.container}>
                {!showForm ? (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShowForm(true)}
                        >
                            <Text style={styles.buttonText}>צור קבוצת הליכה חדשה</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('JoinWalkingGroup')}
                        >
                            <Text style={styles.buttonText}>הצטרף לקבוצת הליכה</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('MyWalkingGroup')}
                        >
                            <Text style={styles.buttonText}>הקבוצות שלי</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>צור קבוצת הליכה חדשה</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="שם הקבוצה"
                                value={groupName}
                                onChangeText={setGroupName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="מנהל הקבוצה"
                                value={groupManager}
                                onChangeText={setGroupManager}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="מספר משתתפי ילדים מינימלי"
                                value={groupMinKids}
                                onChangeText={setGroupMinKids}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="מספר משתתפי ילדים מקסימלי"
                                value={groupMaxKids}
                                onChangeText={setGroupMaxKids}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="טלפון מנהל הקבוצה"
                                value={groupManagerPhone}
                                onChangeText={setGroupManagerPhone}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="דואר אלקטרוני מנהל הקבוצה"
                                value={groupManagerEmail}
                                onChangeText={setGroupManagerEmail}
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="כתובת מנהל הקבוצה"
                                value={groupManagerAddress}
                                onChangeText={setGroupManagerAddress}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="שם הילד שלך"
                                value={groupUserChildName}
                                onChangeText={setGroupUserChildName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="טלפון הילד שלך"
                                value={groupUserChildPhone}
                                onChangeText={setGroupUserChildPhone}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="גיל הילד שלך"
                                value={groupUserChildAge}
                                onChangeText={setGroupUserChildAge}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity
                                style={styles.createButton}
                                onPress={createWalkingGroup}
                            >
                                <Text style={styles.createButtonText}>צור קבוצה חדשה</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowForm(false)}
                            >
                                <Text style={styles.cancelButtonText}>בטל</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    button: {
        backgroundColor: '#1E6738',
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    formContainer: {
        marginVertical: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'right',
    },
    createButton: {
        backgroundColor: '#1E6738',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});


export default WalkingGroups;