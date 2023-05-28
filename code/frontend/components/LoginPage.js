import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  Dimensions,
} from "react-native";
import Buttons from "./Buttons";
import Footer from "./Footer";

const LoginPage = ({ navigation }) => {
  const handleLogin = (email, password) => {
    // Handle login logic here
    // if it's correct, navigate to HomeScreen
    // TODO: login logic here
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>ברגליים - נעים ללכת בעיר</Text>
        <Text style={styles.userDetails}>שם משתמש</Text>
        <TextInput
          style={[styles.input, { color: "black" }]}
          placeholder="הכנס שם משתמש"
          maxLength={50}
          numberOfLines={1}
        />
        <Text style={styles.userDetails}>סיסמא</Text>
        <TextInput
          style={[styles.input, styles.marginBottom, { color: "black" }]}
          placeholder="הכנס סיסמא"
          secureTextEntry={true}
          maxLength={50}
          numberOfLines={1}
        />
        <Buttons title="התחבר" color="orange" width={150} press={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}>
          <Text style={styles.signupNow}>אין לך חשבון? הרשם עכשיו</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signupNow: {
    textAlign: "center",
    fontSize: 15,
    color: "orange",
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: windowHeight * 0.1, // Adjust the paddingBottom to 10% of the screen height
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 300,
    height: 50,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default LoginPage;
