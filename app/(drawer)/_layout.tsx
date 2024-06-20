import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="home" size={25} color="orange" />,
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={24} color="orange" />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
    </Tabs>
  );
};

export default _layout;
