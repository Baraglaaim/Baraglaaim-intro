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
  Linking,
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
import { useFocusEffect } from "@react-navigation/native";
import { MainStyles } from "../styles/MainStyles";

const GroupProfile = ({ navigation, route }) => {
  // --------------------------------- define variables area ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [manager, setManager] = useState({});
  const [children, setChildren] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const group = route.params;

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      setIsModalVisible(false);
    }, [])
  );

  // --------------------------------- back-end area ----------------------------------
  useEffect(() => {
    fachingUsers();
  }, []);

  const fachingUsers = async () => {
    try {
      setIsLoading(true);
      const managerDoc = await getDoc(doc(db, "Users", group.busManager));
      setManager(managerDoc.data());
      let childrenDocs = [];
      for (const child of group.children) {
        const childDoc = await getDoc(doc(db, "Children", child));
        const parentDoc = await getDoc(
          doc(db, "Users", childDoc.data().parent)
        );
        let childData = {
          name: childDoc.data().name,
          parentPhone: parentDoc.data().phone,
        };
        childrenDocs.push(childData);
      }
      setChildren(childrenDocs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  // --------------------------------- front-end area ----------------------------------
  return (
    <SafeAreaView style={MainStyles.page}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>טוען נתונים...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{group.busName}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.regular}>{manager.username}</Text>
            <Text style={styles.regular}>מנהל האוטובוס:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[styles.regular, { color: "blue" }]}
              onPress={() => handlePress(group.busManagerPhone)}
            >
              {group.busManagerPhone}
            </Text>
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
          <View style={styles.textContainer}>
            <Text style={styles.regular}>{group.startTime}</Text>
            <Text style={styles.regular}>שעת התחלה:</Text>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.regular}>
                {" "}
                {children.length} / {group.maxKids}
              </Text>
              <Text style={styles.regular}>רשימת משתתפים:</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="none"
            visible={isModalVisible}
            style={styles.modal}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalContentContainer}>
                <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeader}>רשימת משתתפים</Text>
                </View>
                <View style={styles.ListsContainer}>
                  <ListContainer
                    data={children.map((child) => {
                      return (
                        <View style={styles.textContainer}>
                          <View style={styles.fieldContainer}>
                            <Text style={styles.regular}>שם:</Text>
                            <Text style={styles.regular}>{child.name}</Text>
                          </View>
                          <View style={styles.fieldContainer}>
                            <Text style={styles.regular}>פלאפון ההורה:</Text>
                            <Text
                              style={[styles.regular, { color: "blue" }]}
                              onPress={() => handlePress(child.parentPhone)}
                            >
                              {child.parentPhone}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                    height={0.7}
                    width={0.8}
                    style={{ marginBottom: 100 }}
                  />
                </View>
                <Buttons
                  title="סגור"
                  color="red"
                  width={200}
                  press={() => setIsModalVisible(!isModalVisible)}
                  style={{ marginBottom: 20 }}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>
      )}
      <HeaderIcons navigation={navigation} />
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom: 100,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderColor: "grey",
    marginBottom: 15,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.2,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    margin: 60,
  },
  regular: {
    fontSize: 20,
    textAlign: "right",
    margin: 10,
  },
  modal: {
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  modalHeaderContainer: {
    margin: 30,
  },
  modalHeader: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  ListsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  fieldContainer: {
    flex: 1,
    flexDirection: "column",
    width: 150,
  },
});

export default GroupProfile;
