import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Buttons from "./Buttons";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Login successful
        console.log("Logged in user:", auth.currentUser);
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        // Login failed
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
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
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.userDetails}>סיסמא</Text>
        <TextInput
          style={[styles.input, styles.marginBottom, { color: "black" }]}
          placeholder="הכנס סיסמא"
          secureTextEntry={true}
          maxLength={50}
          numberOfLines={1}
          onChangeText={(text) => setPassword(text)}
        />
        <Buttons title="התחבר" color="orange" width={150} press={handleLogin} />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}>
          <Text style={styles.signupNow}>אין לך חשבון? הרשם עכשיו</Text>
        </TouchableOpacity>
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
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  userDetails: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
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

  error: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  signupNow: {
    textAlign: "center",
    fontSize: 15,
    color: "orange",
    marginBottom: 10,
  },
});

export default LoginPage;
