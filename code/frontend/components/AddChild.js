import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderIcons from './HeaderIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'

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

    const addChild = async () => {
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

                <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                    <Text style={{ color: dob ? '#000' : '#aaa' }}>{dob || 'תאריך לידה של הילד'}</Text>
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
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    genderButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    selectedGenderButton: {
        backgroundColor: '#6d9eeb',
    },
    genderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#6d9eeb',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
    },
    addButtonLabel: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AddChild;