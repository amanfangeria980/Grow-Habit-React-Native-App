import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Commitment"
        options={{ headerTitle: "My Commitments" }}
      />
    </Stack>
  );
};

export default _layout;
