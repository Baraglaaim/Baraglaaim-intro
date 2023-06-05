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
  Modal,
} from "react-native";
import { db, auth } from "../App";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { addDoc, collection, query, getDocs, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  const [classList, setClassList] = useState([]);
  const [isSchoolPickerVisible, setIsSchoolPickerVisible] = useState(false);
  const [isClassPickerVisible, setIsClassPickerVisible] = useState(false);

  useEffect(() => {
    // Fetch the school data from Firestore
    fetchSchools();
  }, []);

  async function fetchSchools() {
    try {
      const schoolsCollection = collection(db, "School");
      const schoolsSnapshot = await getDocs(schoolsCollection);
      const schoolsData = schoolsSnapshot.docs.map((doc) => {
        console.log(doc.id, "=>", doc.data());
        console.log(doc.data().name);
        return { id: doc.id, name: doc.data().name }; // Include the id property
      });
      setSchoolList(schoolsData);
    } catch (error) {
      console.log("Error fetching school data:", error);
    }
  }

  async function fetchClasses(schoolID) {
    try {
      console.log("Fetching classes for school:",);
      const schoolDocRef = doc(db, "School", schoolID);
      const classesCollection = collection(schoolDocRef, "classes");
      const classesSnapshot = await getDocs(classesCollection);
      const classesData = classesSnapshot.docs.map((doc) => {
        console.log(doc.id, "=>", doc.data());
        console.log(doc.data().name);
        return { id: doc.id, name: doc.data().name }; // Include the id property
      });
      setClassList(classesData);
    } catch (error) {
      console.log("Error fetching classes data:", error);
    }
  }

  async function addChildToDB() {
    // Code to add a child to the database
    console.log("Adding child to database...");
    const currentUser = auth.currentUser;
    console.log("user: ", currentUser);
    //add child to db:
    const childDocRef = await addDoc(collection(db, "Children"), {
      name: name,
      school: school,
      class: classChild,
      gender: gender,
      phone: phone,
      parent: currentUser.uid,
    });
    //check if user has already children in db:

    // const q querySnapshot.empty) {
    //   alert("User already exists");
    //   return;
    // }
    if (currentUser.Children) {
      //if user has children, add child to children array:
      const children = currentUser.children;
      children.push(childDocRef.id);
      await updateDoc(currentUser, children);
    } else {
      //if user doesn't have children, create children array and add child to it:
      const children = [childDocRef.id];
      await updateDoc(currentUser, children);
    }
   


  };

  const toggleSchoolPicker = () => {
    setIsSchoolPickerVisible(!isSchoolPickerVisible);
  };

  const toggleClassPicker = () => {
    setIsClassPickerVisible(!isClassPickerVisible);
  };

  const selectSchool = (itemValue) => {
    setSchool(itemValue);
    setIsSchoolPickerVisible(false);

    // Fetch the classes for the selected school
    if (itemValue) {
      fetchClasses(itemValue);
    } else {
      setClassList([]); // Clear the class list if no school is selected
    }
  };

  const selectClass = (itemValue) => {
    setClassChild(itemValue);
    setIsClassPickerVisible(false);
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
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={toggleSchoolPicker}
              >
                <Text style={styles.pickerButtonText}>
                  {school ? school : "בחר בית ספר"}
                </Text>
                <Icon name="chevron-down" size={16} color="black" />
              </TouchableOpacity>
              <Modal
                visible={isSchoolPickerVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsSchoolPickerVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      style={styles.dropdown}
                      selectedValue={school}
                      onValueChange={selectSchool}
                    >
                      <Picker.Item label="בחר בית ספר" value="" />
                      {schoolList.map((school) => (
                        <Picker.Item
                          key={school.id}
                          label={school.name}
                          value={school.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>כיתה:</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={toggleClassPicker}
              >
                <Text style={styles.pickerButtonText}>
                  {classChild ? classChild : "בחר כיתה"}
                </Text>
                <Icon name="chevron-down" size={16} color="black" />
              </TouchableOpacity>
              <Modal
                visible={isClassPickerVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsClassPickerVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      style={styles.dropdown}
                      selectedValue={classChild}
                      onValueChange={selectClass}
                    >
                      <Picker.Item label="בחר כיתה" value="" />
                      {classList.map((classItem) => (
                        <Picker.Item
                          key={classItem.id}
                          label={classItem.name}
                          value={classItem.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Modal>
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
              press={addChildToDB}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
    maxHeight: "80%",
    padding: 10,
  },
  dropdown: {
    height: 150,
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
    fontSize: 20,
  },
});

export default AddChild;
