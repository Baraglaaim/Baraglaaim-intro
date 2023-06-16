import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import { db, auth } from "../FireBaseConsts";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import Buttons from "./Buttons";
import HeaderIcons from "./HeaderIcons";

const CreateCommunity = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [classNames, setClassNames] = useState([]);
    const [className, setClassName] = useState("");

    async function addSchoolToDB() {
        // Validation checks...

        const newSchoolDocRef = await addDoc(collection(db, "School"), {
            name: name,
            phone: phone,
            address: address,
        });

        const classesCollectionRef = collection(newSchoolDocRef, "Classes");
        classNames.forEach(async (className) => {
            await addDoc(classesCollectionRef, {
                name: className,
            });
        });

        Alert.alert("ברכות", "הבית ספר נוסף בהצלחה", [{ text: "אישור" }]);
        navigation.navigate("MyCommunity", {
            username: auth.currentUser.displayName,
        });
    }

    function addClass() {
        if (className) {
            setClassNames((prevClassNames) => [...prevClassNames, className]);
            setClassName("");
        }
    }

    function deleteClass(index) {
        setClassNames((prevClassNames) => {
            const updatedClassNames = [...prevClassNames];
            updatedClassNames.splice(index, 1);
            return updatedClassNames;
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderIcons navigation={navigation} />

            <View style={styles.formContainer}>
                <Text style={styles.title}>הוספת בית ספר</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>שם בית הספר:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="שם בית הספר"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>מספר הטלפון של בית הספר:</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="מספר הטלפון של בית הספר"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>כתובת של בית הספר:</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="כתובת של בית הספר"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>שמות הכיתות:</Text>
                    {classNames.map((name, index) => (
                        <View key={index} style={styles.classNameContainer}>
                            <Text style={styles.className}>{name}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteClass(index)}
                            >
                                <Text style={styles.deleteButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.inputWithButtonContainer}>
                        <TextInput
                            style={[styles.input, styles.classNameInput]}
                            value={className}
                            onChangeText={setClassName}
                            placeholder="שם הכיתה"
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={addClass}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Buttons
                title="הוסף בית ספר"
                color="orange"
                width={200}
                press={addSchoolToDB}
                style={{ marginBottom: 100 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    classNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    className: {
        fontSize: 16,
        flex: 1,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    inputWithButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    classNameInput: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: "orange",
        padding: 8,
        borderRadius: 5,
    },
    addButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CreateCommunity;
