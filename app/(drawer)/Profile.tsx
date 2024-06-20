import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useUserContext } from "../../context/UserContext";
import { router } from "expo-router";

const Profile = () => {
  const { setUser, setIsLoggedIn } = useUserContext();
  const handleLogout = async () => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("@user");
    } catch (error) {
      console.log(error);
    }
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">Profile</Text>
      <TouchableOpacity
        className="border border-black mt-5 p-5 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-xl">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
