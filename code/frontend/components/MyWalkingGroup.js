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
import Footer from "./Footer";
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
const WalkingGroupItem = ({ group, onPress }) => {
  return (
    <View>
      <View style={styles.groupItem}>
        <View style={styles.groupItemHeader}>
          <Text style={[styles.groupItemTitle, { textAlign: "right" }]}>
            {group.busName}
          </Text>
        </View>
        <View style={styles.groupItemFooter}>
          <Text style={styles.groupItemFooterText}>
            המלווה: {group.parentCompanion}
          </Text>
          <Text style={styles.groupItemFooterText}>
            ההליכה הקרובה: {group.nextAccompany}
          </Text>
        </View>
      </View>
      <Buttons
        title="פרופיל הקבוצה"
        color="orange"
        width={150}
        onPress={onPress}
      />
    </View>
  );
};

  const handleGroupPress = (group) => {
    navigation.navigate("GroupProfile", { url: group.profileLink });
  };

  // --------------------------------- front-end area ----------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <HeaderIcons navigation={navigation} />
        <Text style={[styles.title, { marginLeft: 16 }]}>
          קבוצות ההליכה שלי
        </Text>
        <View style={styles.groupList}>
          {groupsList.map((group) => (
            <WalkingGroupItem
              group={group}
              onPress={() => handleGroupPress(group)}
            />
          ))}
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

// --------------------------------- styles area ----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "stretch",
    paddingHorizontal: 16,
  },
  groupItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  groupItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
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
