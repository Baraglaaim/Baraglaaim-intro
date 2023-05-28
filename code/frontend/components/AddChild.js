import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Buttons from "./Buttons";
import Footer from "./Footer";
import HeaderIcons from "./HeaderIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddChild = ({ navigation }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [grade, setGrade] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDob(date.toLocaleDateString("he-IL"));
    hideDatePicker();
  };

  const addChild = async (parent) => {
    // Code to add a child to the database
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <Text style={styles.title}>הוספת ילד חדש</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>שם הילד או הילדה:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="שם הילד או הילדה"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>מספר הטלפון של הילד:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="מספר הטלפון של הילד"
          />
        </View>
        <Text style={styles.label}>תאריך לידה:</Text>
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showDatePicker}
        >
          <Icon name="calendar" size={20} color={dob ? "#000" : "#aaa"} />
          <Text
            style={[
              styles.inputDate,
              { color: dob ? "#000" : "#aaa", marginLeft: 10 },
            ]}
          >
            {dob || "תאריך לידה של הילד"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>כיתת הילד:</Text>
          <TextInput
            style={styles.input}
            value={grade}
            onChangeText={setGrade}
            placeholder="כיתת הילד"
          />
        </View>

        <Text style={styles.label}>מין הילד:</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "זכר" ? styles.selectedGenderButton : null,
            ]}
            onPress={() => setGender("זכר")}
          >
            <Text style={styles.genderLabel}>זכר</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "נקבה" ? styles.selectedGenderButton : null,
            ]}
            onPress={() => setGender("נקבה")}
          >
            <Text style={styles.genderLabel}>נקבה</Text>
          </TouchableOpacity>
        </View>

        <Buttons title="הוסף ילד" color="orange" width={150} press={addChild} />
      </View>
      <Footer />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    textAlign: "right",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    height: 35,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  inputDate: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  selectedGenderButton: {
    backgroundColor: "#ccc",
  },
  genderLabel: {
    fontSize: 16,
    color: "white",
  },
});

export default AddChild;
