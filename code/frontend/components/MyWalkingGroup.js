import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Buttons from "./Buttons";
import HeaderIcons from "./HeaderIcons";
import Footer from "./Footer";

const walkingGroups = [
  {
    id: 1,
    name: "הקבוצה של כיכר משואה",
    children: ["נועם", "משי"],
    parentCompanion: "ריטה",
    nextAccompany: "יום חמישי 15.05.2023, 8:00",
  },
  {
    id: 2,
    name: "הקבוצה של פארק השבשבת",
    children: ["יאיר", "אבנר"],
    parentCompanion: "ביבי",
    nextAccompany: "יום ראשון 18.05.2023, 7:30",
  },
];

const WalkingGroupItem = ({ group, onPress }) => {
  return (
    <View>
      <View style={styles.groupItem}>
        <View style={styles.groupItemHeader}>
          <Text style={[styles.groupItemTitle, { textAlign: "left" }]}>
            {group.name}
          </Text>
          <Text style={styles.groupItemSubtitle}>
            {group.children.join(", ")}
          </Text>
        </View>
        <View style={styles.groupItemFooter}>
          <Text style={styles.groupItemFooterText}>
            המלווה: {group.parentCompanion}
          </Text>
          <Text style={styles.groupItemFooterText}>
            ההליכה הקרובה: {group.nextAccompany}
          </Text>
        </View>
      </View>
      <Buttons
        title="פרופיל הקבוצה"
        color="orange"
        width={150}
        onPress={onPress}
      />
    </View>
  );
};

const MyWalkingGroup = ({ navigation }) => {
  const handleGroupPress = (group) => {
    navigation.navigate("GroupProfile", { url: group.profileLink });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginRight: 16 }}>
        <HeaderIcons navigation={navigation} />
        <Text style={[styles.title, { marginLeft: 16 }]}>
          קבוצות ההליכה שלי
        </Text>
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
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  groupList: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 16,
  },
  groupItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  groupItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  groupItemSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  groupItemFooter: {
    marginTop: 8,
  },
  groupItemFooterText: {
    fontSize: 14,
    color: "#999",
  },
});

export default MyWalkingGroup;
