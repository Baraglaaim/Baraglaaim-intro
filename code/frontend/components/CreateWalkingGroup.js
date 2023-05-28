import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Buttons from "./Buttons";

const CreateWalkingGroup = ({ setShowForm }) => {
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState("");
  const [groupMinKids, setGroupMinKids] = useState("");
  const [groupMaxKids, setGroupMaxKids] = useState("");
  const [groupManagerPhone, setGroupManagerPhone] = useState("");
  const [groupManagerEmail, setGroupManagerEmail] = useState("");
  const [groupManagerAddress, setGroupManagerAddress] = useState("");
  const [groupUserChildName, setGroupUserChildName] = useState("");
  const [groupUserChildPhone, setGroupUserChildPhone] = useState("");
  const [groupUserChildAge, setGroupUserChildAge] = useState("");

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
      groupUserChildAge,
    };

    // Process the new walking group data
    console.log(newWalkingGroup);

    // Hide the form
    setShowForm(false);

    // Reset form data
    setGroupName("");
    setGroupManager("");
    setGroupMinKids("");
    setGroupMaxKids("");
    setGroupManagerPhone("");
    setGroupManagerEmail("");
    setGroupManagerAddress("");
    setGroupUserChildName("");
    setGroupUserChildPhone("");
    setGroupUserChildAge("");
  };

  return (
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
      <Buttons
        title="צור קבוצה חדשה"
        color="orange"
        width={150}
        press={createWalkingGroup}
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowForm(false)}
      >
        <Text style={styles.cancelButtonText}>בטל</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 300,
    height: 20,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginTop: 10,
    width: 100,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CreateWalkingGroup;
