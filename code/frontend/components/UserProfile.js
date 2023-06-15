import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity, // Add this import
  Linking,
} from "react-native";
import HeaderIcons from "./HeaderIcons";

const UserProfile = ({ navigation, route }) => {
  
  useEffect(() => {
    UserProfile()
  }, []);

  async function UserProfile() {
    user = await getDoc(doc(db, "Users", route.params.userId));
    const { name, phone, address } = user.data();
  };
  
  const handlePress = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.regular, { color: "blue" }]}>{phone}</Text>
          </TouchableOpacity>
          <Text style={styles.regular}>טלפון:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.regular}>{address}</Text>
          <Text style={styles.regular}>מיקום:</Text>
        </View>
      </ScrollView>
      <HeaderIcons navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  regular: {
    fontSize: 20,
    textAlign: "right",
    margin: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    lineHeight: 24,
  },
});

export default UserProfile;
