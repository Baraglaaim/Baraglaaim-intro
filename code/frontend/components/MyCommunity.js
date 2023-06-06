import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Buttons from "./Buttons";
import Footer from "./Footer";
import { db, auth } from "../App";
import { query, addDoc, collection, getDocs, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import HeaderIcons from "./HeaderIcons";
import ListContainer from "./ListContainer";


const MyCommunity = ({ navigation }) => {
  const handleJoinPress = () => {
    console.log("Join button pressed");
  };

  // currentUser = auth.auth().currentUser;
  //todo - need to write querry to get list of schools
  async function getCommunityList() {
    const q = query(collection(db, "Users"), where("uid", "==", userUid));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot:", querySnapshot);
  }

  function CommunityList(arr) {
    let communityArr = [];
    arr.map((community) =>
      communityArr.push(CommunityButton(community))
    );
    return communityArr;
  }

  function CommunityButton(name) {
    return (
      <TouchableOpacity
        style={styles.communityContainer}
        onPress={handleJoinPress}
      >
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <View style={styles.communityList}>
          <ListContainer
            width={0.9}
            height={0.5}
            data={CommunityList([
              "אורנים",
              "גוננים",
              "School 3",
              "School 4",
            ])}
            separatorColor="black"
            backgroundColor="pink"
            style={styles.list}
          />
        </View>
      </View>
      <Footer />
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
  },
  communityList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  communityContainer: {
    alignItems: "center",
   backgroundColor: "orange",
   width: 300,
  },
  joinBtn: {
    marginVertical: 10,
  },
  backToLogin: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    // marginTop: 10,
  },
});

export default MyCommunity;
