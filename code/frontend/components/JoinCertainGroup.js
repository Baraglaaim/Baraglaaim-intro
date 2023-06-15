//--------------------------------- import area ----------------------------------
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
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
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import Buttons from "./Buttons";
import { MainStyles, Writings, Inputs } from "../styles/MainStyles";

const JoinCertainGroup = ({ navigation, route }) => {
  //--------------------------------- define variables area ----------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const [child, setChild] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const groupId = route.params.groupID;
  const childrenToJoin = route.params.childrenToJoin;
  //--------------------------------- Back-End area ----------------------------------
  /**
   * This function is called when the component is rendered.
   * It fetches the school data from Firestore.
   * @returns {void}
   */
  useEffect(() => {
    fetchGroup();
  }, []);

  async function fetchGroup() {
    try {
      console.log("group id:", groupId);
      console.log("childrenToJoin:", childrenToJoin);
    } catch (error) {
      console.log("Error fetching group list:", error);
      setIsLoading(false);
    }
  }

  handleJoin = async () => {
    try {
      setIsLoading(true);
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      let groupsArray = userDocRef.data().groups;
      if (!groupsArray) {
        groupsArray = [];
      }
      if (!groupsArray || !groupsArray.includes(groupId)) {
        groupsArray.push(groupId);
        await updateDoc(doc(db, "Users", userDocRef.id), {
          groups: groupsArray,
        });
      }
      const groupDocRef = await getDoc(doc(db, "Groups", groupId));
      let childrenArray = groupDocRef.data().children;
      await updateDoc(doc(db, "Groups", groupId), {
        children: [...childrenArray, child],
      });
      setIsLoading(false);
      navigation.navigate("MyWalkingGroup");
    } catch (error) {
      console.log("Error joining group:", error);
      setIsLoading(false);
    }
  };

  // --------------------------------- functions area ----------------------------------
  const selectChild = (itemValue) => {
    setChild(itemValue);
  };
  // ------------------------Front-End area:------------------------

  return (
    <View style={MainStyles.page}>
      {isLoading ? (
        <View style={MainStyles.loadingContainer}>
          <Text style={Writings.header}>המידע נטען...</Text>
          <ActivityIndicator size="large" color="#4682B4" />
        </View>
      ) : (
        <View>
          <Text style={Writings.header}>הצטרפות לקבוצה</Text>
          {Platform.OS === "ios" ? (
            <SafeAreaView>
              <Text style={styles.label}>בחר/י ילד/ה</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsModalVisible(true)}
              >
                <Text styles={{ textAlign: "right" }}>
                  {selectedValue ? selectedValue : "בחר/י ילד"}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              >
                <SafeAreaView style={styles.modalContainer}>
                  <FlatList
                    data={childrenToJoin}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionContainer}
                        onPress={() => {
                          setSelectedValue(item.name);
                          selectChild(item.id);
                          setIsModalVisible(!isModalVisible);
                        }}
                      >
                        <Text style={styles.optionText}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView>
                <Buttons
                  title="סגור"
                  color="red"
                  width={200}
                  press={() => setIsModalVisible(!isModalVisible)}
                  style={{ marginBottom: 100 }}
                />
              </Modal>
            </SafeAreaView>
          ) : (
            <View style={Inputs.inputContainer}>
              <Picker
                style={Inputs.input}
                selectedValue={child}
                onValueChange={selectChild}
              >
                <Picker.Item label="בחר/י ילד" value="" />
                {childrenToJoin.map((child) => (
                  <Picker.Item
                    key={child.id}
                    label={child.name}
                    value={child.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
      )}
      <Buttons
        title="הצטרף"
        color="orange"
        width={200}
        press={() => handleJoin()}
      />
      <HeaderIcons navigation={navigation} />
    </View>
  );
};

//--------------------------------- style area ----------------------------------
const styles = StyleSheet.create({});

export default JoinCertainGroup;
