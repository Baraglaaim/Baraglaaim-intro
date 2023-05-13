import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const walkingGroups = [
    {
        id: 1,
        date: "15.05.2023, 8:00",
        children: ["נועם", "משי"],
        parentCompanion: "ריטה",
        nextAccompany: "יום חמישי 15.05.2023, 8:00",
    },
    {
        id: 2,
        date: "15.05.2023, 8:00",
        children: ["יאיר", "אבנר"],
        parentCompanion: "ביבי",
        nextAccompany: "יום ראשון 18.05.2023, 7:30",
    }
];

const WalkingGroupItem = ({ group, onPress }) => {
    return (
        <TouchableOpacity style={styles.groupItem} onPress={onPress}>
            <View style={styles.groupItemHeader}>
                <Text style={styles.groupItemTitle}>{group.date}</Text>
                <Text style={styles.groupItemSubtitle}>{group.children.join(", ")}</Text>
            </View>
            <View style={styles.groupItemFooter}>
                <Text style={styles.groupItemFooterText}>
                    {group.parentCompanion} המלווה
                </Text>
                <Text style={styles.groupItemFooterText}>
                    ההליכה הקרובה: {group.nextAccompany}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const MyWalkingGroup = ({ navigation }) => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupPress = (group) => {
        setSelectedGroup(group);
        navigation.navigate("GroupProfile", { url: group.profileLink });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Walking Groups</Text>
            <View style={styles.groupList}>
                {walkingGroups.map((group) => (
                    <WalkingGroupItem
                        key={group.id}
                        group={group}
                        onPress={() => handleGroupPress(group)}
                    />
                ))}
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 32
    },
    groupList: {
        flexDirection: "column",
        alignItems: "stretch",
        paddingHorizontal: 16
    },
    groupItem: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginVertical: 8,
        padding: 16
    },
    groupItemHeader: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 16
    },
    groupItemTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    groupItemSubtitle: {
        fontSize: 18,
        color: "#666"
    },
    groupItemFooter: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 16
    },
    groupItemFooterText: {
        fontSize: 16,
        color: "#999",
        marginBottom: 4
    }
});

export default MyWalkingGroup;