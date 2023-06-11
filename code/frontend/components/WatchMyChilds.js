////////////////////////// <-- import package area START --> //////////////////////////

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { db, auth } from "../FireBaseConsts";
// import { collection, doc, getDocs } from "firebase/firestore";
import { addDoc, collection, doc, getDocs, updateDoc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";

////////////////////////// <-- logic area --> //////////////////////////

const WatchMyChilds = ({ navigation }) => {
  const [kidsList, setKidsList] = useState([]);

  useEffect(() => {
    fetchKidsList();
  }, []);

  const fetchKidsList = async () => {
    try {
      //get current user doc id:
      const currentUser = auth.currentUser;
      const q = query(collection(db, "Users"), where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const userDocId = userDocRef.id;

      //get all kids docs:
      const kidsCollection = collection(db, "Children");
      const kidsSnapshot = await getDocs(kidsCollection);

      const kidsData = [];
      kidsSnapshot.forEach((kidDoc) => {
        const kidData = kidDoc.data();
        if (kidData.parent === userDocId) {
          console.log("kid data is: ", kidData.parent);
          const kidItem = {
            id: kidDoc.id,
            name: kidData.name,
            school: kidData.school,
            class: kidData.class,
          };
          kidsData.push(kidItem);
        }
      });

      setKidsList(kidsData);
      console.log("kids data is: ", kidsData);
    } catch (error) {
      console.log("Error fetching kids list:", error);
    }
  };

  const handleAddChild = () => {
    navigation.navigate("AddChild");
  };

  const handleKidPress = (index) => {
    const selectedKid = kidsList[index];
    Alert.alert(
      "התראה",
      `${selectedKid.name}, ${selectedKid.school}, ${selectedKid.class}`,
      [
        {
          text: "לא",
          style: "cancel",
        },
      ]
    );
  };


  ////////////////////////// <-- UI area --> //////////////////////////

  const renderKid = ({ item, index }) => {
    const { name, school, class: kidClass } = item;
    return (
      <TouchableOpacity 
        style={styles.kidContainer}
        onPress={() => handleKidPress(index)}
      >
        <Text style={styles.kidName}>{name}</Text>
        <Text style={styles.kidDetails}>
          {`${school}, ${kidClass}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <Text style={styles.title}>צפה בילד שלי</Text>
        
        <FlatList style={styles.kidsList}
          data={kidsList}
          renderItem={renderKid}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.kidsList}
          
        />

        <Buttons
          title="הוספת ילד"
          color="orange"
          width={150}
          press={handleAddChild}
        />
      </View>
    </SafeAreaView>
  );
};


////////////////////////// <-- style area --> //////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "white",
  },
  kidsList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(70, 130, 180)",
  },
  kidContainer: {
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: "90%",

  },
  kidName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    color: "gold",
    textAlign: "center",
  },
  kidDetails: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  }
});

export default WatchMyChilds;
