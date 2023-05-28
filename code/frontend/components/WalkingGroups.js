import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";
import Footer from "./Footer";
import CreateWalkingGroup from "./CreateWalkingGroup";

const WalkingGroups = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <View style={styles.overlay}>
        {!showForm ? (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowForm(true)}
            >
              <Text style={styles.buttonText}>צור קבוצת הליכה חדשה</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("JoinWalkingGroup")}
            >
              <Text style={styles.buttonText}>הצטרף לקבוצת הליכה</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("MyWalkingGroup")}
            >
              <Text style={styles.buttonText}>הקבוצות שלי</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CreateWalkingGroup setShowForm={setShowForm} />
        )}
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
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    backgroundColor: "#1E6738",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WalkingGroups;
