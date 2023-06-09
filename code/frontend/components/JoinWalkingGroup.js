//--------------------------------- import area ----------------------------------
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Buttons from "./Buttons";
import Footer from "./Footer";
import HeaderIcons from "./HeaderIcons";
import { db, auth } from "../FireBaseConsts";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const JoinWalkingGroup = ({ navigation }) => {
  //--------------------------------- define variables area ----------------------------------

  const [groupsList, setGroupsList] = useState([]);

  //--------------------------------- Back-End area ----------------------------------
  /**
   * This function is called when the component is rendered.
   * It fetches the school data from Firestore.
   * @returns {void}
   */
  useEffect(() => {
    fetchGroupsList();
  }, []);

  async function fetchGroupsList() {
    try {
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const userDocId = userDocRef.id;

      const childs = userDocRef.data().children;
      if (!childs) return;
      const schoolList = [];
      for (const child of childs) {
        const childDoc = doc(db, "Children", child);
        const childDocRef = await getDoc(childDoc);
        const school = childDocRef.data().school;
        if (!schoolList.includes(school)) {
          schoolList.push(school);
        }
      }
      console.log("school list is: ", schoolList);

      const q2 = query(
        collection(db, "Groups"),
        where("school", "in", schoolList)
      );
      const groupsCollection = await getDocs(q2);
      console.log("groups collection is: ", groupsCollection);
      // const groupsCollection = collection(db, "Groups");
      // const groupsSnapshot = await getDocs(groupsCollection);
      const groupsSnapshot = groupsCollection.docs;
      const groupsData = [];
      for (const groupDoc of groupsSnapshot) {
        const managerID = groupDoc.data().busManager;
        const managerDocRef = doc(db, "Users", managerID);
        const managerDoc = await getDoc(managerDocRef);
        const managerName = managerDoc.data().username;
        const name = groupDoc.data().name;
        const school = groupDoc.data().school;
        const managerPhone = groupDoc.data().busManagerPhone;
        const startLocation = groupDoc.data().startLocation;
        const startTime = groupDoc.data().startTime;
        const groupItem = {
          name: name,
          school: school,
          manager: managerName,
          managerPhone: managerPhone,
          startLocation: startLocation,
          startTime: startTime,
        };
        groupsData.push(groupItem);
      }
      setGroupsList(groupsData);
      console.log("groups data is: ", groupsData);
    } catch (error) {
      console.log("Error fetching group list:", error);
    }
  }

  const handleGroupPress = (index) => {
    console.log("group index is: ", index);
    navigation.navigate("GroupProfile", { groupIndex: index });
  };

  const renderGroup = ({ item, index }) => {
    const { name, manager, managerPhone, startLocation } = item;
    return (
      <TouchableOpacity
        style={styles.groupContainer}
        onPress={() => handleGroupPress(index)}
      >
        <Text>Walking Group Name: {name}</Text>
        <Text>Manager: {manager}</Text>
        <Text>Manager's Phone: {managerPhone}</Text>
        <Text>Meeting Point: {startLocation}</Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => handleJoinGroup(index)}
        >
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // ------------------------Front-End area:------------------------

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerIconsContainer}>
        <HeaderIcons />
      </View> */}
      <ScrollView>
        {groupsList.map((item, index) => (
          <View key={index}>{renderGroup({ item, index })}</View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  joinButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  headerIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

export default JoinWalkingGroup;
