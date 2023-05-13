import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/FontAwesome';


const AddChild = ({ navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [grade, setGrade] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setDob(date.toLocaleDateString('he-IL'));
        hideDatePicker();
    };

    const addChild = async (parent) => {
        // Code to add a child to the database
    };

    return (
        <View>
            <HeaderIcons navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>הוספת ילד חדש</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="שם הילד/הילדה"
                />

                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="מספר הטלפון של הילד"
                />


                <TouchableOpacity
                    style={styles.datePickerContainer} onPress={showDatePicker}>
                    <Icon name="calendar" size={20} color={dob ? '#000' : '#aaa'} />
                    <Text style={[styles.inputDate, styles.datePickerText, { color: dob ? '#000' : '#aaa', marginLeft: 10 }]}>{dob || 'תאריך לידה של הילד'}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={grade}
                    onChangeText={setGrade}
                    placeholder="כיתת הילד"
                />
                <Text style={styles.label}>מין הילד:</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'זכר' ? styles.selectedGenderButton : null]}
                        onPress={() => setGender('זכר')}
                    >
                        <Text style={styles.genderLabel}>זכר</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'נקבה' ? styles.selectedGenderButton : null]}
                        onPress={() => setGender('נקבה')}
                    >
                        <Text style={styles.genderLabel}>נקבה</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={addChild}>
                    <Text style={styles.addButtonLabel}>הוסף ילד</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                locale="he-IL"
                headerTextIOS="בחירת תאריך לידה"
                cancelTextIOS="ביטול"
                confirmTextIOS="אישור"
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        width: '100%',
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'right',
    },
    inputDate: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        width: '90%',
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'right',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginVertical: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    genderButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    selectedGenderButton: {
        backgroundColor: '#ddd',
    },
    genderLabel: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#00509D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    addButtonLabel: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        width: '100%',
        padding: 10,
        marginVertical: 10,
    },
    datePickerText: {
        fontSize: 16,
        textAlign: 'right',
    },
});

export default AddChild;