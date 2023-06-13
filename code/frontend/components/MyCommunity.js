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
import { db } from "../FireBaseConsts";
import { collection, getDocs } from "firebase/firestore";
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
      const querySnapshot = await getDocs(collection(db, "School"));
      const schools = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>טוען נתונים...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <View>
          <Text style={[styles.title, { marginLeft: 16 }]}>הקהילות שלי</Text>
          <ScrollView style={styles.schoolList}>
            {schoolsList.map((school) => (
              <SchoolItem key={school.id} {...school} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  schoolList: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  schoolItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  schoolItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  schoolItemTitleIOS: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default MyCommunity;
