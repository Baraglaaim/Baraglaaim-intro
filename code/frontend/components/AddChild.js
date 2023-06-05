import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
// import firebase from "firebase/app";
// import "firebase/firestore";
import { db } from "../App";
import { collection, doc, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import Buttons from "./Buttons";
import Footer from "./Footer";
import HeaderIcons from "./HeaderIcons";
import MyWalkingGroup from "./MyWalkingGroup";
import { Picker } from "@react-native-picker/picker";

const AddChild = ({ navigation }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [classChild, setClassChild] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolList, setSchoolList] = useState([]);

  useEffect(() => {
    // Fetch the school data from Firestore
    fetchSchools();
  }, []);

  async function fetchSchools() {
    try {
      const schoolsCollection = collection(db, "School");
      const schoolsSnapshot = await getDocs(schoolsCollection);
      const schoolsData = schoolsSnapshot.docs.map((doc) => {
        // console.log(doc.id, " => ", doc.data().name);
        return { name: doc.data().name };
      });
      setSchoolList(schoolsData);
    } catch (error) {
      console.log("Error fetching school data:", error);
    }
  }

  const addChild = async (parent) => {
    // Code to add a child to the database
  };

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const selectSchool = (itemValue) => {
    setSchool(itemValue);
    setIsPickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.overlay}>
            <Text style={styles.title}>הוספת צועדת/צועדת</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>שם הצועד/צועדת:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="שם הצועד/צועדת"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>מספר הטלפון של הצועד/צועדת:</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="מספר הטלפון של הצועד/צועדת, במידה ויש נייד"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>בית ספר:</Text>
              <View style={styles.dropdownContainer}>
                <TouchableWithoutFeedback onPress={togglePicker}>
                  <View style={styles.pickerButton}>
                    <Text style={styles.pickerButtonText}>
                      {school ? school : "בחר בית ספר"}
                    </Text>
                    <Icon name="chevron-down" size={16} color="black" />
                  </View>
                </TouchableWithoutFeedback>
                {isPickerVisible && (
                  <Picker
                    style={styles.dropdown}
                    selectedValue={school}
                    onValueChange={selectSchool}
                  >
                    <Picker.Item label="בחר בית ספר" value="" />
                    {schoolList.map((school) => (
                      <Picker.Item
                        key={school.id} // Use the id of the school
                        label={school.name}
                        value={school.id}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>כיתה:</Text>
              <TextInput
                style={styles.input}
                value={classChild}
                onChangeText={setClassChild}
                placeholder="כיתה"
              />
            </View>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "👦" ? styles.selectedGenderButton : null,
                ]}
                onPress={() => setGender("👦")}
              >
                <Text style={styles.genderLabel}>👦</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "👧" ? styles.selectedGenderButton : null,
                ]}
                onPress={() => setGender("👧")}
              >
                <Text style={styles.genderLabel}>👧</Text>
              </TouchableOpacity>
            </View>
            <Buttons
              title="הוסף צועד/צועדת"
              color="orange"
              width={200}
              press={() => MyWalkingGroup()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 100, // Adjust this value to leave enough space for the footer
  },
  scrollViewContent: {
    flexGrow: 1,
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
  dropdownContainer: {
    position: "relative",
    width: "100%",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  pickerButtonText: {
    flex: 1,
    marginRight: 5,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
