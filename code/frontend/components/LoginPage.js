import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { db } from "../FireBaseConsts";
import Buttons from "./Buttons";
import { query, addDoc, collection, getDocs, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Login successful
      const user = userCredential.user;
      console.log("Logged in user:", user.uid);
      const userUid = user.uid;
      const q = query(collection(db, "Users"), where("uid", "==", userUid));
      const querySnapshot = await getDocs(q);
      console.log(
        "Logged in user name:",
        querySnapshot.docs[0].data().username
      );

      if (querySnapshot.empty) {
        alert("User does not exist");
        return;
      }

      navigation.navigate("HomeScreen", {
        username: querySnapshot.docs[0].data().username,
        // userName: user.uid,
      });
    } catch (error) {
      // Login failed
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>אוטובוס הליכה</Text>
        <Text style={styles.userDetails}>מייל</Text>
        <TextInput
          style={[styles.input, { color: "black" }]}
          placeholder="מייל"
          maxLength={50}
          numberOfLines={1}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.userDetails}>סיסמא</Text>
        <TextInput
          style={[styles.input, styles.marginBottom, { color: "black" }]}
          placeholder="סיסמא"
          secureTextEntry={true}
          maxLength={50}
          numberOfLines={1}
          onChangeText={(text) => setPassword(text)}
        />
        <Buttons
          title="התחברות"
          color="orange"
          width={150}
          press={handleLogin}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <View style={styles.signupContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}>
            <Text style={styles.signupLink}> להרשמה</Text>
          </TouchableOpacity>
          <Text style={styles.signupNow}>אין לך חשבון? </Text>
        </View>
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
    marginBottom: 20,
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
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signupNow: {
    fontSize: 15,
    color: "orange",
  },
  signupLink: {
    textDecorationLine: "underline",
    color: "orange",
    marginLeft: 5,
  },
});

export default LoginPage;
