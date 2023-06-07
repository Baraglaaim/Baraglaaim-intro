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
import { db, auth } from "../App";
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const JoinWalkingGroup = ({ navigation }) => {
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    fetchGroupsList();
  }, []);

  const fetchGroupsList = async () => {
    try {
      //get current user doc id:
      const currentUser = auth.currentUser;
      const q = query(collection(db, "Users"), where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const userDocId = userDocRef.id;

      //get all user schools:
      const childs = userDocRef.data().children;
      if (!childs) return;
      const schoolList = [];
      childs.forEach((child) => {
        const school = child.school; // Access school directly from child object
        if (!schoolList.includes(school)) { // Use includes instead of indexOf
          //not in the list -> add to the list:
          schoolList.push(school);
        }
      });

      //get all groups docs:
      const groupsCollection = collection(db, "Groups");
      const groupsSnapshot = await getDocs(groupsCollection);

      async function getManagerName(groupDoc) {
        const managerID = groupDoc.data().busManager;
        const managerDocRef = doc(db, "Users", managerID);
        const managerDoc = await getDoc(managerDocRef);
        const managerName = managerDoc.data().username;
        console.log("manager name is: ", managerDoc.data().username);
        const groupItem = {
          name: groupDoc.data().name,
          school: groupDoc.data().school,
          manager: managerName,
          managerPhone: groupDoc.data().managerPhone,
          startLocation: groupDoc.data().startLocation,
          startTime: groupDoc.data().startTime,
        };
        groupsData.push(groupItem);
      }
      //get user groups data:
      const groupsData = [];
      groupsSnapshot.forEach((groupDoc) => {
        getManagerName(groupDoc);
        // if (schoolList.includes(groupData.school)) { // Check if schoolList includes groupData.school
        //   console.log("group data is: ", groupData.parent);
        //   const groupItem = {
        //     name: groupData.name,
        //     school: groupData.school,
        //     manager: groupData.manager,
        //     managerPhone: groupData.managerPhone,
        //     startLocation: groupData.startLocation,
        //     startTime: groupData.startTime,
        //   };
        //   groupsData.push(groupItem);
        // }
      });

      setGroupsList(groupsData);
      console.log("groups data is: ", groupsData);
    } catch (error) {
      console.log("Error fetching group list:", error);
    }
  };

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
        <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinGroup(index)}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.headerIconsContainer}>
        {/* Add the HeaderIcons component or any other header icons you need */}
        <HeaderIcons />
      </View>
      <ScrollView>
        {groupsList.map((item, index) => (
          <View key={index}>
            {renderGroup({ item, index })}
          </View>
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
