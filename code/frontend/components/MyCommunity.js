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
import HeaderIcons from "./HeaderIcons";

const MyCommunity = ({ navigation }) => {
  const handleJoinPress = () => {
    console.log("Join button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <Text style={styles.title}>My Communities</Text>
        <View style={styles.communityContainer}>
          <Buttons
            title="אורנים"
            color="grey"
            width={150}
            press={handleJoinPress}
          />
        </View>
        <View style={styles.communityContainer}>
          <Buttons
            title="ממלכתי דתי"
            color="grey"
            width={150}
            press={handleJoinPress}
          />
        </View>
        <View style={styles.communityContainer}>
          <Buttons
            title="סתם ביהס"
            color="grey"
            width={150}
            press={handleJoinPress}
          />
        </View>
        <Buttons
          style={styles.joinBtn}
          title="הצטרף לקהילה חדשה"
          color="orange"
          width={220}
          press={handleJoinPress}
        />

        <Buttons
          style={styles.joinBtn}
          title="מסך הבית"
          color="green"
          width={140}
          onPress={handleJoinPress}
        />
        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <Text style={styles.backToLogin}>חזור להתחברות</Text>
        </TouchableOpacity>
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
    width: "80%",
    // marginVertical: 10,
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
