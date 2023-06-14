import React from "react";
import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";

import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ברוך הבא {username}</Text>
      <View style={styles.overlay}>
        <Buttons
          title="הוסף ילד"
          color="#E6ECFF"
          textColor="black"
          width={200}
          press={() => navigation.navigate("AddChild")}
        />
        <Buttons
          title="הילדים שלי"
          color="#E6ECFF"
          textColor="black"
          width={200}
          press={() => navigation.navigate("WatchMyChilds")}
        />
        <Buttons
          title="קבוצות הליכה"
          color="#E6ECFF"
          textColor="black"
          width={200}
          press={() => navigation.navigate("MyWalkingGroup")}
        />
        <Buttons
          title="הקהילות שלי"
          color="#E6ECFF"
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
  overlay: {
    backgroundColor: "#96CCE4",
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
