import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import Buttons from "./Buttons";
import Footer from "./Footer";

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = () => {
    // Handle registration logic here
    // console.log('Registering with username:', username, 'email:', email, 'password:', password);
    // navigate to LoginPage after the registration process is complete
    navigation.navigate("WelcomePage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <View>
          <Text style={styles.header}>הרשמה - ברגליים</Text>
          <Text style={styles.userDetails}>שם משתמש</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: "black" }]}
              placeholder="הכנס שם משתמש"
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
              placeholder="הכנס אימייל"
              value={email}
              onChangeText={setEmail}
              maxLength={50}
              numberOfLines={1}
            />
          </View>
          <Text style={styles.userDetails}>סיסמא</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: "black" }]}
              placeholder="הכנס סיסמא"
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
              style={[styles.input, styles.marginBottom, { color: "black" }]}
              placeholder="הכנס סיסמא שוב"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              maxLength={50}
              numberOfLines={1}
            />
          </View>
          <Buttons
            title="הירשם"
            color="orange"
            width={150}
            press={handleRegistration}
          />
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgb(70, 130, 180)", // Updated color
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userDetails: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    width: "100%", // Set width to 100%
    alignItems: "center",
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

export default RegisterPage;
