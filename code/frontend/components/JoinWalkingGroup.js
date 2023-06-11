//--------------------------------- import area ----------------------------------
import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Footer from "./Footer";
import HeaderIcons from "./HeaderIcons";
import { db, auth } from "../FireBaseConsts";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const JoinWalkingGroup = ({ navigation }) => {
  //--------------------------------- define variables area ----------------------------------

  const [groupsList, setGroupsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];

      const childs = userDocRef.data().children;
      if (!childs) {
        setIsLoading(false);
        return;
      }
      const schoolList = [];
      for (const child of childs) {
        const childDoc = doc(db, "Children", child);
        const childDocRef = await getDoc(childDoc);
        const school = childDocRef.data().school;
        if (!schoolList.includes(school)) {
          schoolList.push(school);
        }
      }
      const q2 = query(
        collection(db, "Groups"),
        where("school", "in", schoolList)
      );
      const groupsCollection = await getDocs(q2);
      const groupsSnapshot = groupsCollection.docs;
      const groupsData = [];
      for (const groupDoc of groupsSnapshot) {
        const managerID = groupDoc.data().busManager;
        const managerDocRef = doc(db, "Users", managerID);
        const managerDoc = await getDoc(managerDocRef);
        const managerName = managerDoc.data().username;
        const groupID = groupDoc.id;
        const name = groupDoc.data().busName;
        const school = groupDoc.data().school;
        const managerPhone = groupDoc.data().busManagerPhone;
        const startLocation = groupDoc.data().startLocation;
        const startTime = groupDoc.data().startTime;
        const maxCapacity = groupDoc.data().maxKids;
        const currentCapacity = groupDoc.data().children.length;
        const alreadyJoined = childs.some((child) => {
          return groupDoc.data().children.includes(child);
        });
        const groupItem = {
          groupID: groupID,
          name: name,
          school: school,
          manager: managerName,
          managerPhone: managerPhone,
          startLocation: startLocation,
          startTime: startTime,
          maxCapacity: maxCapacity,
          currentCapacity: currentCapacity,
          alreadyJoined: alreadyJoined,
        };
        groupsData.push(groupItem);
      }
      setGroupsList(groupsData);
      console.log("groups data is: ", groupsData);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching group list:", error);
      setIsLoading(false);
    }
  }

  const handleGroupPress = ({ groupID, index }) => {
    console.log("groupID is: ", groupID);
    // navigation.navigate("JoinGroupDetails", { groupID: groupID });
  };

  const renderGroup = ({ item, index }) => {
    const { name, manager, managerPhone, startLocation } = item;
    return (
      <View style={styles.groupContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
        <Text>מנהל: {manager}</Text>
        <Text>טלפון מנהל: {managerPhone}</Text>
        <Text>נקודת מפגש: {startLocation}</Text>
        <Text>שעת יציאה: {item.startTime}</Text>
        <Text>
          כמות משתתפים: {item.currentCapacity} / {item.maxCapacity}
        </Text>
        {item.alreadyJoined ? (
          <Text style={{ color: "green", fontWeight: "bold" }}>
            כבר הצטרפת לקבוצה זו
          </Text>
        ) : (
          <Buttons
            title="הצטרף לקבוצה"
            color="orange"
            width={220}
            press={() =>
              handleGroupPress({ groupID: item.groupID, index: index })
            }
          />
        )}
      </View>
    );
  };

  // ------------------------Front-End area:------------------------

  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>המידע נטען...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <ScrollView>
          {groupsList.map((item, index) => (
            <View key={index}>{renderGroup({ item, index })}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

//--------------------------------- style area ----------------------------------
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4682B4",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default JoinWalkingGroup;
