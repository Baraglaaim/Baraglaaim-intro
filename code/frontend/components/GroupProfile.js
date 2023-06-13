//--------------------------------- import area ----------------------------------
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
  Platform,
  Modal,
  FlatList,
  Linking ,
  SafeAreaView,
} from "react-native";
import Footer from "./Footer";
import ListContainer from "./ListContainer";
import Buttons from "./Buttons";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, set } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { is } from "date-fns/locale";

const GroupProfile = ({ navigation, route }) => {
  // --------------------------------- define variables area ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [manager, setManager] = useState({});
  const [children, setChildren] = useState([]);

  //   const group = route.params;
  const group = {
    busManager: "F6wxomgRo3qwuYw5Nofo",
    busManagerPhone: "0509240224",
    busName: "ההולכים",
    children: [
      "PKQ7ewrQy9U77hYrCA5S",
    ],
    id: "K9xqNDN5Szj0NRHjE3QM",
    maxKids: "17",
    school: "Gonenim",
    schoolName: "גוננים",
    startLocation: "הפסל הלבן",
    startTime: "06:30",
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, [])
  );

  // --------------------------------- back-end area ----------------------------------
  useEffect(() => {
    fachingUsers();
  }, []);

  const fachingUsers = async () => {
    setIsLoading(true);
    const managerDoc = await getDoc(doc(db, "Users", group.busManager));
    setManager(managerDoc.data());
    let childrenDocs = [];
    for (const child of group.children) {
        const childDoc = await getDoc(doc(db, "Children", child));
        childrenDocs.push(childDoc.data());
    }
    console.log(childrenDocs);
    setChildren(childrenDocs);
    setIsLoading(false);
  };

    const handlePress = (phoneNumber) => {
      Linking.openURL(`tel:${phoneNumber}`);
    };
  // --------------------------------- front-end area ----------------------------------
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>טוען נתונים...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>{group.busName}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.regular}>{manager.username}</Text>
            <Text style={styles.regular}>מנהל האוטובוס:</Text>
          </View>
            <View style={styles.textContainer}>
                <Text style={[styles.regular, {color:"blue"}]} onPress={() => handlePress(group.busManagerPhone)}>{group.busManagerPhone}</Text>
                <Text style={styles.regular}>טלפון:</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.regular}>{group.schoolName}</Text>
                <Text style={styles.regular}>מוסד חינוך:</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.regular}>{group.startLocation}</Text>
                <Text style={styles.regular}>מיקום התחלה:</Text>
            </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// --------------------------------- style area ----------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  regular: {
    fontSize: 20,
    textAlign: "right",
    margin: 10,
  },
});

export default GroupProfile;
