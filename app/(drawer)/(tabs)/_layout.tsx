import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import {
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
} from "@expo/vector-icons";

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerLeft: () => <DrawerToggleButton />,
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <AntDesign name="home" size={25} color="orange" />
                    ),
                    tabBarActiveTintColor: "black",
                }}
            />
            <Tabs.Screen
                name="Sprint"
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="run-fast"
                            size={24}
                            color="orange"
                        />
                    ),
                    tabBarActiveTintColor: "black",
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color="orange"
                        />
                    ),
                    tabBarActiveTintColor: "black",
                }}
            />
        </Tabs>
    );
};

export default _layout;
