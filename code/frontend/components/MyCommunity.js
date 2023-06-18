import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
import { auth, db } from "../FireBaseConsts";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import HeaderIcons from "./HeaderIcons";

const MyCommunity = ({ navigation }) => {
  const [schoolsList, setSchoolsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSchoolsList();
  }, []);

  async function fetchSchoolsList() {
    try {
      setIsLoading(true);
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const children = userDocRef.data().children;
      const schools = [];
      for (const child of children) {
        const childDocRef = await getDoc(doc(db, "Children", child));
        const childData = childDocRef.data();
        const schoolDocRef = await getDoc(doc(db, "School", childData.school));
        const school = schoolDocRef.data();
        if (!schools.some((s) => s.id === school.id)) {
          schools.push(school);
        }
      }
      setSchoolsList(schools);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const SchoolItem = (school) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.schoolItem}
          onPress={() => handleSchoolPress(school)}
        >
          <Text
            style={[
              styles.schoolItemTitle,
              Platform.OS === "ios" && styles.schoolItemTitleIOS,
            ]}
          >
            {school.name}
          </Text>
          {/* <Text style={styles.schoolItemTitle}>{school.address}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  function handleSchoolPress(school) {
    navigation.navigate("SchoolProfile", { ...school });
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: "#AED1EC"}]}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>טוען נתונים...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <View>
          <Text style={[styles.title, {alignItems: "center" }]}>הקהילות שלי</Text>
          <ScrollView style={styles.schoolList}>
            {schoolsList.map((school) => (
              <SchoolItem {...school}/>
            ))}
          </ScrollView>
        </View>
      )}
      <HeaderIcons navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AED1EC",
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    // marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  schoolList: {
    paddingHorizontal: 16,
    marginBottom: 150,
  },
  schoolItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
  },
  schoolItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  schoolItemTitleIOS: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyCommunity;
