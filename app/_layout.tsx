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
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </UserContextProvider>
  );
};

export default _layout;
