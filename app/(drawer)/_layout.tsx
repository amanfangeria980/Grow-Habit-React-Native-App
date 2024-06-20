import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={"Home"}
        icon={({ color, size }) => (
          <AntDesign name="home" size={25} color="orange" />
        )}
        onPress={() => {
          router.push("/(drawer)/(tabs)/Home");
        }}
      />
      <DrawerItem
        label={"Profile"}
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={24} color="orange" />
        )}
        onPress={() => {
          router.push("/(drawer)/(tabs)/Profile");
        }}
      />
      <DrawerItem
        label={"Commitments"}
        icon={({ color, size }) => (
          <Feather name="target" size={24} color="orange" />
        )}
        onPress={() => {
          router.push("/Commitment");
        }}
      />
    </DrawerContentScrollView>
  );
};

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerTitle: "" }}
      />
    </GestureHandlerRootView>
  );
};

export default _layout;
