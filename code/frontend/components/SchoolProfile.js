import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

const SchoolProfile = ({ route }) => {
  const { name, phone, address, description } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.regular}>{phone}</Text>
          <Text style={styles.regular}>טלפון:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.regular}>{address}</Text>
          <Text style={styles.regular}>מיקום:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
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

export default SchoolProfile;
