import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import Footer from "./Footer";
import HeaderIcons from "./HeaderIcons";
import { db, auth } from "../FireBaseConsts";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { format } from "date-fns"; // Add this line

import { Picker } from "@react-native-picker/picker";

const CreateWalkingGroup = ({ navigation }) => {
  const [busName, setBusName] = useState("");
  const [busMaxKids, setBusMaxKids] = useState("");
  const [busStartLocation, setBusStartLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [school, setSchool] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [child, setChild] = useState("");
  const [childList, setChildList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChilds();
  }, []);

  async function fetchChilds() {
    setIsLoading(true);
    try {
      const currentUser = auth.currentUser;
      const userDocRef = await getDoc(doc(db, "Users", currentUser.uid));
      const userData = userDocRef.data();
      if (!userData || !userData.children) {
        setIsLoading(false);
        return;
      }
      const childPromises = userData.children.map(async (childId) => {
        const childDocRef = await getDoc(doc(db, "Children", childId));
        const childData = childDocRef.data();
        const schoolDocRef = await getDoc(doc(db, "Schools", childData.school));
        const schoolName = schoolDocRef.data().name;
        return { id: childDocRef.id, name: childData.name, school: schoolName };
      });
      const childsList = await Promise.all(childPromises);
      setChildList(childsList);
      const uniqueSchools = Array.from(new Set(childsList.map((child) => child.school)));
      const schoolPromises = uniqueSchools.map(async (schoolName) => {
        const schoolQuery = query(collection(db, "Schools"), where("name", "==", schoolName));
        const schoolQuerySnapshot = await getDocs(schoolQuery);
        const schoolDocRef = schoolQuerySnapshot.docs[0];
        return { id: schoolDocRef.id, school: schoolDocRef.data().name };
      });
      const schoolsList = await Promise.all(schoolPromises);
      setSchoolList(schoolsList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching childs:", error);
      setIsLoading(false);
    }
  }


  const addWalkingGroupToDB = async () => {
    Keyboard.dismiss();
    if (!busName || !busMaxKids || !busStartLocation || !selectedDate || !school || !child) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const walkingGroup = {
        busName: busName,
        busMaxKids: Number(busMaxKids),
        busStartLocation: busStartLocation,
        date: selectedDate,
        school: school,
        child: child,
      };
      await addDoc(collection(db, "WalkingGroups"), walkingGroup);
      setIsLoading(false);
      Alert.alert("Success", "Walking Group created successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding walking group:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to create walking group.");
    }
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setFormattedTime(format(date, "hh:mm a")); // Update this line
    setShowPicker(false);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <HeaderIcons />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Bus Name:</Text>
          <TextInput
            style={styles.input}
            value={busName}
            onChangeText={(text) => setBusName(text)}
            placeholder="Enter bus name"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Max Kids:</Text>
          <TextInput
            style={styles.input}
            value={busMaxKids}
            onChangeText={(text) => setBusMaxKids(text)}
            placeholder="Enter maximum number of kids"
            placeholderTextColor="#8b9cb5"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Bus Start Location:</Text>
          <TextInput
            style={styles.input}
            value={busStartLocation}
            onChangeText={(text) => setBusStartLocation(text)}
            placeholder="Enter bus start location"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Date:</Text>
          <TouchableOpacity style={styles.datePicker} onPress={showDateTimePicker}>
            <Text style={styles.datePickerText}>{selectedDate ? formattedTime : "Select date and time"}</Text>
            <Icon name="calendar" size={20} color="#2c3e50" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showPicker}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDateTimePicker}
            minimumDate={new Date()}
            is24Hour={false}
          />

          <Text style={styles.label}>School:</Text>
          <Picker
            selectedValue={school}
            style={styles.picker}
            onValueChange={(itemValue) => setSchool(itemValue)}
          >
            <Picker.Item label="Select school" value="" />
            {schoolList.map((school) => (
              <Picker.Item key={school.id} label={school.school} value={school.school} />
            ))}
          </Picker>

          <Text style={styles.label}>Child:</Text>
          <Picker
            selectedValue={child}
            style={styles.picker}
            onValueChange={(itemValue) => setChild(itemValue)}
          >
            <Picker.Item label="Select child" value="" />
            {childList.map((child) => (
              <Picker.Item key={child.id} label={child.name} value={child.name} />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={addWalkingGroupToDB} // Update this line
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.createGroupButtonText}>Create Group</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  datePicker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  datePickerText: {
    color: "#333",
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  createGroupButton: {
    alignSelf: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createGroupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateWalkingGroup;