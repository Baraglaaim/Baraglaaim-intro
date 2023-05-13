import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import HeaderIcons from "./HeaderIcons";
import Buttons from "./Buttons";

const MyCommunity = ({ navigation }) => {
    const handleJoinPress = () => {
        console.log("Join button pressed");
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <View style={styles.content}>
                <Text style={styles.title}>My Communities</Text>
                {/* Add your list of communities here */}
                <View style={styles.communityContainer}>
                    <Buttons
                        title="אורנים"
                        color="grey"
                        width={150}
                        press={handleJoinPress}
                    />
                </View>
                <View style={styles.communityContainer}>
                    <Buttons
                        title="ממלכתי דתי"
                        color="grey"
                        width={150}
                        press={handleJoinPress}
                    />
                </View>
                <View style={styles.communityContainer}>
                    <Buttons
                        title="סתם ביהס"
                        color="grey"
                        width={150}
                        press={handleJoinPress}
                    />
                </View>
                {/* Add Join Community button */}
                <Buttons
                    style={styles.joinBtn}
                    title=" הצטרף לקהילה חדשה"
                    color="#2196F3"
                    width={220}
                    press={handleJoinPress}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    communityContainer: {
        alignItems: "center",
        width: "80%",
        marginVertical: 2,
    },
    joinBtn: {
        flex: 1,
        marginTop: 5,
    },
});

export default MyCommunity;
