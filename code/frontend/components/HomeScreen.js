import React from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform } from "react-native";
import HeaderIcons from "./HeaderIcons";
import Footer from "./Footer";
import kidsImage from "../assets/two-boys-brothers-running-autumn-park.jpg";

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;

  const headerMarginTop = Platform.select({
    ios: -700,
    android: 0,
    default: -500,
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={[styles.header, { marginTop: headerMarginTop }]}>שלום, {username}!</Text>
        </View>
        <Image source={kidsImage} style={styles.image} resizeMode="cover" />
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
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center", // Center the image vertically
  },
  content: {
    position: "absolute",
    top: "20%", // Position the text 20% from the top
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5, // Set the opacity of the image
  },
});

export default HomeScreen;
