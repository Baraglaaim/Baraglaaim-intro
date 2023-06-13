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
  SafeAreaView,
} from "react-native";
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

const MyWalkingGroup = ({ navigation }) => {
  // --------------------------------- define variables area ----------------------------------
  const [groupsList, setGroupsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------- Back-End area ----------------------------------
  useEffect(() => {
    fetchGroupsList();
  }, []);

  async function fetchGroupsList() {
    try {
      setIsLoading(true);
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const groups = userDocRef.data().groups;
      if (!groups) {
        setIsLoading(false);
        return;
      }
      const userGroups = [];
      for (const group of groups) {
        const groupDocRef = doc(db, "Groups", group);
        const groupDoc = await getDoc(groupDocRef);
        const groupData = groupDoc.data();
        const schoolDocRef = doc(db, "School", groupData.school);
        const schoolDoc = await getDoc(schoolDocRef);
        const schoolName = schoolDoc.data().name;
        groupData.schoolName = schoolName;
        groupData.id = groupDoc.id;
        userGroups.push(groupData);
      }
      console.log(userGroups);
      setGroupsList(userGroups);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // --------------------------------- functions area ----------------------------------
  const WalkingGroupItem = (group) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.groupItem}
          onPress={() => handleGroupPress(group)}
        >
          <View style={styles.groupItemHeader}>
            <Text style={styles.groupItemTitle}>
              {group.schoolName} - {group.busName}
            </Text>
          </View>
          <View style={styles.groupItemFooter}>
            <Text style={styles.groupItemFooterText}>
              שעת יציאה: {group.startTime}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  function handleGroupPress(group) {
    navigation.navigate("GroupProfile", { ...group });
  }

  // --------------------------------- front-end area ----------------------------------
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>טוען נתונים...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <View>
          <Text style={[styles.title, { marginLeft: 16 }]}>האוטובוסים שלי</Text>
          <ScrollView style={styles.groupList}>
            {groupsList.map((group) => (
              <WalkingGroupItem key={group.id} {...group} />
            ))}
          </ScrollView>
        </View>
      )}
      <HeaderIcons navigation={navigation} />
    </SafeAreaView>
  );
};

// --------------------------------- styles area ----------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  groupList: {
    flexDirection: "column",
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  groupItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  groupItemHeader: {
    textAlign: "right",
  },
  groupItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "right",
  },
  groupItemSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  groupItemFooter: {
    marginTop: 8,
  },
  groupItemFooterText: {
    fontSize: 14,
    color: "#999",
  },
});

export default MyWalkingGroup;
