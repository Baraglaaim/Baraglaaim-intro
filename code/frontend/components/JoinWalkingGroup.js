import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from "react-native";
import HeaderIcon from "./HeaderIcons";

const JoinWalkingGroup = ({ navigation }) => {
    return (
        <View>
            <HeaderIcon navigation={navigation} />
            <Text>Join Walking Group</Text>
        </View>
    );
};

export default JoinWalkingGroup;