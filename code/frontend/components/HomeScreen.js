import React from "react";
import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require("../assets/walkingKids.mp4")}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <Text style={styles.header}>ברוך הבא {username}</Text>
      <View style={styles.overlay}>
        <Buttons
          title="הוסף ילד"
          color="gold"
          textColor="black"
          width={200}
          press={() => navigation.navigate("AddChild")}
        />
        <Buttons
          title="הילדים שלי"
          color="gold"
          textColor="black"
          width={200}
          press={() => navigation.navigate("WatchMyChilds")}
        />
        <Buttons
          title="קבוצות הליכה"
          color="gold"
          textColor="black"
          width={200}
          press={() => navigation.navigate("MyWalkingGroup")}
        />
        <Buttons
          title="הקהילות שלי"
          color="gold"
          textColor="black"
          width={200}
          press={() => navigation.navigate("MyCommunity")}
        />
      </View>
      <HeaderIcons navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  // containerIOS: {
  //   flex: 1,
  // },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default HomeScreen;
