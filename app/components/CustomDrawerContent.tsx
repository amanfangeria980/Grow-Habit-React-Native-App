import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { View, Image, Text, StyleSheet } from "react-native";
import { useUserContext } from "../../context/UserContext";
const CustomDrawerContent = (props) => {
  const { user } = useUserContext();
  const pathname = usePathname();

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex flex-row px-3 py-5 border-b border-b-orange-300 mb-6 gap-4">
        <Image
          source={{ uri: user.photo }}
          className="w-16 h-16 rounded-full"
          resizeMode="contain"
        />
        <View className="flex items-center justify-center ">
          <Text className="self-start font-semibold text-lg text-orange-400 ">
            {user.name}
          </Text>
          <Text className="self-start font-normal text-md text-orange-400 underline">
            {user.email}
          </Text>
        </View>
      </View>
      <DrawerItem
        label={"Home"}
        icon={({ color, size }) => (
          <AntDesign
            name="home"
            size={25}
            color={pathname === "/Home" ? "white" : "orange"}
          />
        )}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Home" ? "white" : "orange" },
        ]}
        style={{ backgroundColor: pathname === "/Home" ? "orange" : "white" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/Home");
        }}
      />
      <DrawerItem
        label={"Profile"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Profile" ? "white" : "orange" },
        ]}
        icon={({ color, size }) => (
          <Ionicons
            name="person-outline"
            size={24}
            color={pathname === "/Profile" ? "white" : "orange"}
          />
        )}
        style={{
          backgroundColor: pathname === "/Profile" ? "orange" : "white",
        }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/Profile");
        }}
      />
      <DrawerItem
        label={"Commitments"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Commitment" ? "white" : "orange" },
        ]}
        icon={({ color, size }) => (
          <Feather
            name="target"
            size={24}
            color={pathname === "/Commitment" ? "white" : "orange"}
          />
        )}
        style={{
          backgroundColor: pathname === "/Commitment" ? "orange" : "white",
        }}
        onPress={() => {
          router.push("/Commitment");
        }}
      />
      <DrawerItem
        label={"Settings"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Settings" ? "white" : "orange" },
        ]}
        icon={({ color, size }) => (
          <Feather
            name="settings"
            size={24}
            color={pathname === "/Settings" ? "white" : "orange"}
          />
        )}
        style={{
          backgroundColor: pathname === "/Settings" ? "orange" : "white",
        }}
        onPress={() => {
          router.push("/Settings");
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  navItemLabel: { marginLeft: -20, fontSize: 18 },
});

export default CustomDrawerContent;
