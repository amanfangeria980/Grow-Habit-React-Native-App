import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import UserContextProvider from "../context/UserContext";
const _layout = () => {
  return (
    <UserContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(commitment)"
          options={{
            headerTitle: "My Commitments",
          }}
        />
      </Stack>
    </UserContextProvider>
  );
};

export default _layout;
