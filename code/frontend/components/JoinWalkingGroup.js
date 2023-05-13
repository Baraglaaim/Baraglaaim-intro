import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeaderIcon from "./HeaderIcons";

const walkingGroups = [
    {
        id: 1,
        name: "קבוצת הליכה אל סלוודור",
        childrenCount: 5,
        manager: "אורטל",
        departureTime: "8:00",
        parentCompanionRequired: false,
        distance: 150
    },
    {
        id: 2,
        name: "קבוצת הליכה רוטשילד 20",
        childrenCount: 8,
        manager: "נועם",
        departureTime: "7:30",
        parentCompanionRequired: true,
        distance: 250
    },
    {
        id: 3,
        name: "קבוצת הליכה וייצמן 12",
        childrenCount: 4,
        manager: "טלי",
        departureTime: "8:15",
        parentCompanionRequired: false,
        distance: 400
    }
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
                <Text style={styles.groupItemFooterText}>מנהל הקבוצה: {group.manager}</Text>
                <Text style={styles.groupItemFooterText}>
                    שעת יציאה: {group.departureTime}
                </Text>
                <Text style={styles.groupItemFooterText}>
                    {group.parentCompanionRequired ? "נדרש הורה מלווה" : "לא נדרש הורה מלווה"}
                </Text>
                <Text style={styles.groupItemFooterText}>מרחק: {group.distance} מטרים</Text>
            </View>
        </TouchableOpacity>
    );
};

const JoinWalkingGroup = ({ navigation }) => {
    const handleGroupPress = (group) => {
        navigation.navigate("GroupProfile", { id: group.id });
    };

    return (
        <View>
            <HeaderIcon navigation={navigation} />
                <View style={styles.header}>
                    <Text style={styles.title}>הצטרף לקבוצת הליכה</Text>
                </View>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: "#f8f8f8"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    groupList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    groupItem: {
        backgroundColor: "#f8f8f8",
        marginBottom: 10,
        padding: 10
    },
    groupItemHeader: {
        marginBottom: 5
    },
    groupItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    groupItemSubtitle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    groupItemFooter: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 5
    },
    groupItemFooterText: {
        fontSize: 14,
        marginBottom: 3
    }
});

export default JoinWalkingGroup;