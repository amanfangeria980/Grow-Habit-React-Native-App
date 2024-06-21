import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { usePathname } from "expo-router";

const _layout = () => {
  const pathname = usePathname();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerTitle: pathname.slice(1) }}
      />
    </GestureHandlerRootView>
  );
};

export default _layout;
