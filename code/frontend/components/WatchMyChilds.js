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
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const WatchMyChilds = ({ navigation }) => {
  const [kidsList, setKidsList] = useState([]);
  let isMounted = true; // Flag to check if the component is mounted

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

      if (isMounted) {
        setKidsList(kidsData);
      }

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
    // Alert.alert(
    //   "האם למחוק את selectedKid.name?",
    //   `${selectedKid.name}, ${selectedKid.school}, ${selectedKid.class}`,
    //   [
    //     {
    //       text: "לא",
    //       style: "cancel",
    //     },
    //     {
    //       text: "כן",
    //       onPress: () => handleDeleteChild(selectedKid.id),
    //       style: "destructive",
    //     },
    //   ]
    // );
    handleDeleteChild(selectedKid.id);
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

      // Update the local state to reflect the changes
      const updatedKidsList = kidsList.filter((kid) => kid.id !== id);
      setKidsList(updatedKidsList);

      // Retrieve the list of walking groups
      const groupsQuerySnapshot = await getDocs(collection(db, "Groups"));
      const groupsData = groupsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        children: doc.data().children || [],
      }));

      // Iterate through each walking group and remove the child from the "children" array
      const updatedGroupsData = groupsData.map((group) => {
        const updatedChildren = group.children.filter((childId) => childId !== id);
        return {
          id: group.id,
          children: updatedChildren,
        };
      });

      // Update the walking group documents in the "Groups" collection
      const batch = db.batch();
      updatedGroupsData.forEach((group) => {
        const groupRef = doc(db, "Groups", group.id);
        batch.update(groupRef, { children: group.children });
      });
      await batch.commit();
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
        <Text style={styles.kidName}>{name}</Text>
        <Text style={styles.kidDetails}>{`${school}`}</Text>
        <TouchableOpacity
          style={styles.deleteOpacity}
          onPress={() => handleKidPress(id)}
        >
          <FontAwesomeIcon icon={faTrash} style={styles.deleteIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
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
          press={handleAddChild}
        />
      </View>
    </SafeAreaView>
  );
};

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
