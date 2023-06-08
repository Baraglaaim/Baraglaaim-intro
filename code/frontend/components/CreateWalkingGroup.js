//--------------------------------- import area ----------------------------------
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Buttons from "./Buttons";
import { db, auth } from "../FireBaseConsts";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome";
import ListContainer from "./ListContainer";
import { Picker } from "@react-native-picker/picker";

const CreateWalkingGroup = ({ navigation }) => {
  //--------------------------------- define variables area ----------------------------------
  const [busName, setBusName] = useState("");
  const [busMaxKids, setBusMaxKids] = useState("");
  const [busStartLocation, setBusStartLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [school, setSchool] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState("");

  //--------------------------------- Back-End area ----------------------------------
  /**
   * This function is called when the component is rendered.
   * It fetches the school data from Firestore.
   * @returns {void}
   */
  useEffect(() => {
    // Fetch the school data from Firestore
    fetchSchools();
  }, []);

  /**
   * This function fetches the school data from Firestore.
   * @returns {void}
   * @throws {error} error - Firebase error
   */
  async function fetchSchools() {
    try {
      const schoolsCollection = collection(db, "School");
      const schoolsSnapshot = await getDocs(schoolsCollection);
      const schoolsData = schoolsSnapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name };
      });
      setSchoolList(schoolsData);
    } catch (error) {
      console.log("Error fetching school data:", error);
    }
  }

  /**
   * This function adds the walking group to the DB.
   * @returns {void}
   * @throws {error} error - Firebase error
   */
  async function addWalkingGroupToDB() {
    if (busName === "") {
      Alert.alert("שגיאה", "אנא הכנס/י שם לקבוצה", [{ text: "הבנתי" }]);
      return;
    }
    if (busMaxKids > 10 || busMaxKids < 1 || busMaxKids === "") {
      Alert.alert("שגיאה", "אנא הכנס/י מספר ילדים מרבי בין 1 ל-10", [{ text: "הבנתי" }]);
      return;
    }
    if (busStartLocation === "") {
      Alert.alert("שגיאה", "אנא הכנס/י מקום יציאה", [{ text: "הבנתי" }]);
      return;
    }
    if (formattedTime === "") {
      Alert.alert("שגיאה", "אנא הכנס/י שעת יציאה", [{ text: "הבנתי" }]);
      return;
    }
    if (school === "") {
      Alert.alert("שגיאה", "אנא בחר/י בית ספר", [{ text: "הבנתי" }]);
      return;
    }
    const currentUser = auth.currentUser;
    const q = query(
      collection(db, "Users"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const userDocRef = querySnapshot.docs[0];
    const userDocId = userDocRef.id;
    const groupDocRef = await addDoc(collection(db, "Groups"), {
      busName: busName,
      busManager: userDocId,
      busManagerPhone: userDocRef.data().phone,
      maxKids: busMaxKids,
      startLocation: busStartLocation,
      startTime: formattedTime,
    });
    const groupDocId = groupDocRef.id;
    if (userDocRef.data().groups) {
      updateDoc(doc(db, `Users/${userDocId}`), {
        groups: [...userDocRef.data().groups, groupDocId],
      });
    } else {
      updateDoc(doc(db, `Users/${userDocId}`), {
        groups: [groupDocId],
      });
    }
    Alert.alert("הקבוצה נוצרה בהצלחה!", "ברכותינו", [{ text: "אישור" }]);
    navigation.navigate("HomeScreen", {
      username: userDocRef.data().username,});
  }

  // ------------------------funcions area:------------------------
  /**
   * This function is called when the user selects a time from the time picker.
   * @param {Date} selectedDate - The selected date
   * @returns {void}
   */
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    setFormattedTime(format(selectedDate, "HH:mm"));
    setShowPicker(false);
  };

  /**
   * This function is called when the user presses the time picker.
   * It shows the time picker.
   * @returns {void}
   */
  function showDateTimePicker() {
    setShowPicker(true);
  }

  /**
   * This function is called when the user selects a school from the school picker.
   * @param {string} itemValue - The selected school id
   * @returns {void}
   */
  const selectSchool = (itemValue) => {
    setSchool(itemValue);
  };

  // ------------------------Front-End area:------------------------
  return (
    // ------------------------JSX area:------------------------
    <View style={styles.page}>
      <ScrollView style={styles.formContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>שם הקבוצה</Text>
            <TextInput
              style={styles.input}
              value={busName}
              onChangeText={setBusName}
              placeholder="הקלד/י שם לקבוצה"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>מספר ילדים מרבי</Text>
            <TextInput
              style={styles.input}
              value={busMaxKids}
              onChangeText={setBusMaxKids}
              placeholder="הקלד/י את מספר הילדים המרבי"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>מקום יציאה</Text>
            <TextInput
              style={styles.input}
              value={busStartLocation}
              onChangeText={setBusStartLocation}
              placeholder="הקלד/י מקום יציאה"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>שעת יציאה</Text>
            <TouchableOpacity style={styles.input} onPress={showDateTimePicker}>
              <Icon name="clock-o" size={25} color="grey" style={styles.icon} />
              <Text style={styles.pickerText}>{formattedTime || "hh:mm"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showPicker}
              mode="time"
              is24Hour
              date={date}
              display={Platform.OS === "android" ? "spinner" : undefined}
              onConfirm={handleDateChange}
              onCancel={() => setShowPicker(false)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Picker
              style={styles.input}
              selectedValue={school}
              onValueChange={selectSchool}
            >
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
      </ScrollView>
      <Buttons
        title="יצירת אוטובוס הליכה"
        color="orange"
        width={220}
        press={addWalkingGroupToDB}
      />
    </View>
  );
};

// ------------------------Style area:------------------------
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
    height: "80%",
    width: "90%",
    borderRadius: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    flexDirection: "row",
    textAlign: "right",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
    height: 35,
    paddingHorizontal: 10,
  },
  clock: {
    paddingTop: 2,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "20%",
    height: 35,
  },
  pickerText: {
    marginTop: 5,
    height: 35,
    width: "60%",
    paddingRight: 5,
    paddingLeft: 5,
    textAlign: "right",
  },
});

export default CreateWalkingGroup;
