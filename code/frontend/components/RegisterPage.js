import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Buttons from "./Buttons";
import Footer from "./Footer";
import { addDoc, collection, query, getDocs, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../FireBaseConsts";

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const q = query(collection(db, "Users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("User already exists");
        setIsLoading(false);
        return;
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const docRef = await addDoc(collection(db, "Users"), {
        uid: uid,
        username: username,
        email: email,
        address: address,
        phone: phone,
      });

      setIsLoading(false);
      navigation.navigate("WelcomePage", { username }); // Pass username to WelcomePage
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.header}>כמה רגעים...</Text>
          <ActivityIndicator size="large" color="#F5F5F5" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={{ marginBottom: 100 }}>
            <View style={styles.overlay}>
              <View>
                <Text style={styles.header}>הרשמה</Text>
                <Text style={styles.userDetails}>שם משתמש</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { color: "black" }]}
                    placeholder="שם משתמש"
                    value={username}
                    onChangeText={setUsername}
                    maxLength={50}
                    numberOfLines={1}
                  />
                </View>
                <Text style={styles.userDetails}>כתובת אימייל</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { color: "black" }]}
                    placeholder="אימייל"
                    value={email}
                    onChangeText={setEmail}
                    maxLength={50}
                    numberOfLines={1}
                  />
                </View>
                <Text style={styles.userDetails}>טלפון</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { color: "black" }]}
                    placeholder="טלפון"
                    value={phone}
                    onChangeText={setPhone}
                    maxLength={10}
                    numberOfLines={1}
                  />
                </View>
                <Text style={styles.userDetails}>כתובת מגורים</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { color: "black" }]}
                    placeholder="כתובת מגורים"
                    value={address}
                    onChangeText={setAddress}
                    maxLength={50}
                    numberOfLines={1}
                  />
                </View>
                <Text style={styles.userDetails}>סיסמא</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { color: "black" }]}
                    placeholder="סיסמא"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    maxLength={50}
                    numberOfLines={1}
                  />
                </View>
                <Text style={styles.userDetails}>אימות סיסמא</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.marginBottom,
                      { color: "black" },
                    ]}
                    placeholder="אימות סיסמא"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    maxLength={50}
                    numberOfLines={1}
                  />
                </View>

                <Buttons
                  title="הרשמה"
                  color="orange"
                  width={150}
                  press={handleRegistration}
                />
              </View>
            </View>
          </ScrollView>
          <Footer />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(70, 130, 180)',
  },
  overlay: {
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "white",
    marginTop: 20,
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  userDetails: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 300,
    height: 40,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default RegisterPage;
