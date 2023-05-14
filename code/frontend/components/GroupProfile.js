import React from "react";
import { View, Text } from "react-native";

const GroupProfile = ({ route }) => {
    const { id } = route.params;
    return (
        <View>
            <Text>Group Profile Screen</Text>
            <Text>Group ID: {id}</Text>
        </View>
    );
};

export default GroupProfile;