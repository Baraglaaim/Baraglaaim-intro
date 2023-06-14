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
import {
  deleteDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";
import { Ionicons } from "@expo/vector-icons";
// import { Platform } from "react-native";

const WatchMyChilds = ({ navigation }) => {
  const [kidsList, setKidsList] = useState([]);
  let isMounted = true; // Flag to check if the component is mounted

  useFocusEffect(
    React.useCallback(() => {
      // setKidsList([]);
    }, [])
  );
  useEffect(() => {
    fetchKidsList();

    return () => {
      isMounted = false; // Clean up the flag when the component is unmounted
    };
  }, []);

  const fetchKidsList = async () => {
    try {
      //get current user doc id:
      const currentUser = auth.currentUser;
      const q = query(
        collection(db, "Users"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0];
      const userDocId = userDocRef.id;
      const children = userDocRef.data().children;

      let kidsData = [];
      for (const childId of children) {
        const childDocRef = await getDoc(doc(db, "Children", childId));
        const childDocData = childDocRef.data();
        const schoolDocRef = await getDoc(
          doc(db, "School", childDocData.school)
        );
        const classesCollectionRef = collection(
          doc(db, "School", childDocData.school),
          "Classes"
        );
        const classDocRef = await getDoc(
          doc(classesCollectionRef, childDocData.class)
        );
        childDocData.school = schoolDocRef.data().name;
        childDocData.class = classDocRef.data().name;
        childDocData.id = childId;
        kidsData.push(childDocData);
      }
      console.log("kids data is: ", kidsData);

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

  const handleDeleteChild = async (id) => {
    try {
      // Delete child item from the "Children" collection
      await deleteDoc(doc(db, "Children", id));

      // Delete child from the user's array of children
      const currentUser = auth.currentUser;
      const userQuerySnapshot = await getDocs(
        query(collection(db, "Users"), where("uid", "==", currentUser.uid))
      );
      const userDocRef = userQuerySnapshot.docs[0];
      const userDocId = userDocRef.id;
      const userDocData = userDocRef.data();

      // Remove the child ID from the user's array of children
      const updatedChildren = userDocData.children.filter(
        (childId) => childId !== id
      );

      // Update the user document in the "Users" collection
      await updateDoc(doc(db, "Users", userDocId), {
        children: updatedChildren,
      });

      // Remove the child from the "Groups" collection
      const groupsQuerySnapshot = await getDocs(collection(db, "Groups"));
      const groupsPromises = [];
      groupsQuerySnapshot.forEach((groupDoc) => {
        const groupData = groupDoc.data();
        const updatedGroupChildren = groupData.children.filter(
          (childId) => childId !== id
        );
        if (updatedGroupChildren.length !== groupData.children.length) {
          const groupDocRef = doc(db, "Groups", groupDoc.id);
          const updatePromise = updateDoc(groupDocRef, {
            children: updatedGroupChildren,
          });
          groupsPromises.push(updatePromise);
        }
      });
      await Promise.all(groupsPromises);

      // Update the local state to reflect the changes
      const updatedKidsList = kidsList.filter((kid) => kid.id !== id);
      setKidsList(updatedKidsList);
    } catch (error) {
      console.log("Error deleting child:", error);
    }
  };

  const renderKid = ({ item, index }) => {
    const { id, name, school, class: kidClass } = item;

    return (
      <TouchableOpacity
        style={styles.kidContainer}
        onPress={() => handleKidPress(index)}
      >
        <TouchableOpacity
          style={styles.deleteOpacity}
          onPress={() => handleDeleteChild(id)}
        >
          <Ionicons name="trash-outline" style={styles.deleteIcon} />
        </TouchableOpacity>
        <Text style={styles.kidName}>{name}</Text>
        <Text style={styles.kidDetails}>{`${school}`}</Text>
        <Text style={styles.kidDetails}>{`${kidClass}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>צפה בילד שלי</Text>
        <FlatList
          style={styles.kidsList}
          data={kidsList}
          renderItem={renderKid}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.kidsList}
        />
        <Buttons
          title="הוספת ילד"
          color="orange"
          width={150}
          style={{ marginBottom: 100 }}
          press={handleAddChild}
        />
      </View>
      <HeaderIcons navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
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
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#A8E2FA",
    direction: "ltr",
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
  },
  deleteOpacity: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
  deleteIcon: {
    color: "red",
    fontSize: 30,
  },
});

export default WatchMyChilds;
