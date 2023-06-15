import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyBpaY7Ds0ypV7P6yJocAARhQqSDqcZnKJs",
  authDomain: "baraglaaim.firebaseapp.com",
  databaseURL:
    "https://baraglaaim-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "baraglaaim",
  storageBucket: "baraglaaim.appspot.com",
  messagingSenderId: "941901960409",
  appId: "1:941901960409:web:7bf3e5793bbed7753adac8",
  measurementId: "G-8GJP6EDXGZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function login(email, password) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return signInWithEmailAndPassword(auth, email, password);
}

function DataBase() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonPress = () => {
    login(email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("Logged in user:", user);
        // You can navigate to another screen or perform other actions here
      })
      .catch((error) => {
        // Login failed
        const errorMessage = error.message;
        Alert.alert("Login Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLoginButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default DataBase;