import React from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomeScreen from "./components/HomeScreen";
import HeaderIcons from "./components/HeaderIcons";
import AddChild from "./components/AddChild";
import WatchMyChilds from "./components/WatchMyChilds";
import MyCommunity from "./components/MyCommunity";
import WalkingGroups from "./components/WalkingGroups";
import JoinWalkingGroup from "./components/JoinWalkingGroup";
import MyWalkingGroup from "./components/MyWalkingGroup";
import GroupProfile from "./components/GroupProfile";
import WelcomePage from "./components/WelcomePage";
import CreateWalkingGroup from "./components/CreateWalkingGroup";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen
        name="LoginPage"
        options={{ title: "Login" }}
        component={LoginPage}
      />
      <Stack.Screen
        name="RegisterPage"
        options={{ title: "Register" }}
        component={RegisterPage}
      />
      <Stack.Screen
        name="CreateWalkingGroup"
        options={{ title: "CreateWalkingGroup" }}
        component={CreateWalkingGroup}
      />
      <Stack.Screen
        name="WelcomePage"
        options={{ title: "Welcome" }}
        component={WelcomePage}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{ title: "Home" }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="HeaderIcons"
        options={{ title: "Header" }}
        component={HeaderIcons}
      />
      <Stack.Screen
        name="MyCommunity"
        options={{ title: "MyCommunity" }}
        component={MyCommunity}
      />
      <Stack.Screen
        name="WalkingGroups"
        options={{ title: "Walking Groups" }}
        component={WalkingGroups}
      />
      <Stack.Screen
        name="WatchMyChilds"
        options={{ title: "Watch My Childs" }}
        component={WatchMyChilds}
      />
      <Stack.Screen
        name="AddChild"
        options={{ title: "Add Child" }}
        component={AddChild}
      />
      <Stack.Screen
        name="MyWalkingGroup"
        options={{ title: "My Walking Group" }}
        component={MyWalkingGroup}
      />
      <Stack.Screen
        name="JoinWalkingGroup"
        options={{ title: "Join Walking Group" }}
        component={JoinWalkingGroup}
      />
      <Stack.Screen
        name="GroupProfile"
        options={{ title: "Group profile" }}
        component={GroupProfile}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
