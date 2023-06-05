import React from "react";
import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";
import HeaderIcons from "./HeaderIcons";
import Footer from "./Footer";
import kidsImage from "../assets/kidsWalking.jpg";

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <Text style={styles.header}>ברוך הבא {username}</Text>
        <Image source={kidsImage} style={styles.image} />
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

export default HomeScreen;
