import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Buttons from "./Buttons";
import Footer from "./Footer";

const walkingGroups = [
  {
    id: 1,
    name: "קבוצת הליכה אל סלוודור",
    childrenCount: 5,
    manager: "אורטל",
    departureTime: "8:00",
    parentCompanionRequired: false,
    distance: 150,
  },
  {
    id: 2,
    name: "קבוצת הליכה רוטשילד 20",
    childrenCount: 8,
    manager: "נועם",
    departureTime: "7:30",
    parentCompanionRequired: true,
    distance: 250,
  },
  {
    id: 3,
    name: "קבוצת הליכה וייצמן 12",
    childrenCount: 4,
    manager: "טלי",
    departureTime: "8:15",
    parentCompanionRequired: false,
    distance: 400,
  },
];

const WalkingGroupItem = ({ group, onPress }) => {
  return (
    <TouchableOpacity style={styles.groupItem} onPress={onPress}>
      <View style={styles.groupItemHeader}>
        <Text style={styles.groupItemTitle}>{group.name}</Text>
        <Text style={styles.groupItemSubtitle}>
          ילדים בקבוצה: {group.childrenCount}
        </Text>
      </View>
      <View style={styles.groupItemFooter}>
        <Text style={styles.groupItemFooterText}>
          מנהל הקבוצה: {group.manager}
        </Text>
        <Text style={styles.groupItemFooterText}>
          שעת יציאה: {group.departureTime}
        </Text>
        <Text style={styles.groupItemFooterText}>
          {group.parentCompanionRequired
            ? "נדרש הורה מלווה"
            : "לא נדרש הורה מלווה"}
        </Text>
        <Text style={styles.groupItemFooterText}>
          מרחק: {group.distance} מטרים
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const JoinWalkingGroup = ({ navigation }) => {
  const handleGroupPress = (group) => {
    navigation.navigate("GroupProfile", { id: group.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>הצטרף לקבוצת הליכה</Text>
        <View style={styles.groupList}>
          {walkingGroups.map((group) => (
            <WalkingGroupItem
              key={group.id}
              group={group}
              onPress={() => handleGroupPress(group)}
            />
          ))}
        </View>
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
  overlay: {
    backgroundColor: "rgb(70, 130, 180)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  groupItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  groupItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  groupItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  groupItemSubtitle: {
    fontSize: 16,
    color: "white",
  },
  groupItemFooter: {},
  groupItemFooterText: {
    fontSize: 14,
    color: "white",
  },
});

export default JoinWalkingGroup;
