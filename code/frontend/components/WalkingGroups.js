import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/FontAwesome';


const WalkingGroups = ({ navigation }) => {
    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupManager, setGroupManager] = useState('');
    const [groupMinKids, setGroupMinKids] = useState('');
    const [groupMaxKids, setGroupMaxKids] = useState('');
    const [groupManagerPhone, setGroupManagerPhone] = useState('');
    const [groupManagerEmail, setGroupManagerEmail] = useState('');
    const [groupManagerAddress, setGroupManagerAddress] = useState('');
    const [GroupUserChildName, setGroupUserChildName] = useState('');
    const [GroupUserChildPhone, setGroupUserChildPhone] = useState('');
    const [GroupUserChildAge, setGroupUserChildAge] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [walkingGroups, setWalkingGroups] = useState([]);

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date.toDateString());
        hideDatePicker();
    };

    const createWalkingGroup = () => {
        const newWalkingGroup = {
            groupName,
            groupManager,
            groupMinKids,
            groupMaxKids,
            groupManagerPhone,
            groupManagerEmail,
            groupManagerAddress,
            GroupUserChildName,
            GroupUserChildPhone,
            GroupUserChildAge,
            selectedDate
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
        setSelectedDate('');
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
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="שם קבוצת ההליכה"
                                value={groupName}
                                onChangeText={setGroupName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="מנהל קבוצת ההליכה"
                                value={groupManager}
                                onChangeText={setGroupManager}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="מספר מינימלי של ילדים בקבוצה"
                                value={groupMinKids}
                                onChangeText={setGroupMinKids}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="מספר מקסימלי של ילדים בקבוצה"
                                value={groupMaxKids}
                                onChangeText={setGroupMaxKids}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="מספר הטלפון של מנהל קבוצת ההליכה"
                                value={groupManagerPhone}
                                onChangeText={setGroupManagerPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="האימייל של מנהל קבוצת ההליכה"
                                value={groupManagerEmail}
                                onChangeText={setGroupManagerEmail}
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="כתובת מנהל קבוצת ההליכה"
                                value={groupManagerAddress}
                                onChangeText={setGroupManagerAddress}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="שם הילד"
                                value={GroupUserChildName}
                                onChangeText={setGroupUserChildName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="מספר הטלפון של הילד"
                                value={GroupUserChildPhone}
                                onChangeText={setGroupUserChildPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="גיל הילד"
                                value={GroupUserChildAge}
                                onChangeText={setGroupUserChildAge}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.datePickerButton}
                                onPress={showDatePicker}
                            >
                                <Text style={styles.datePickerButtonText}>בחר תאריך</Text>
                                <Icon name="calendar" size={25} style={styles.datePickerIcon} />
                            </TouchableOpacity>
                        </View>
                        {selectedDate !== '' && (
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateText}>{selectedDate}</Text>
                            </View>
                        )}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    createWalkingGroup();
                                    setShowForm(false);
                                }}
                            >
                                <Text style={styles.buttonText}>צור קבוצה</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setShowForm(false)}
                            >
                                <Text style={styles.buttonText}>ביטול</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
    },
    inputContainer: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 18,
        marginRight: 10,
    },
    datePickerIcon: {
        color: '#ccc',
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#b5e5ff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#b5e5ff',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'right',
    },
    datePickerButton: {
        flexDirection: 'row',
        backgroundColor: '#b5e5ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    datePickerButtonText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    datePickerIcon: {
        marginLeft: 10,
    },
    dateContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        // text to be on in center of the box:
        textAlign: 'center',
    },
});

export default WalkingGroups;