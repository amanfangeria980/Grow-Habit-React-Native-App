import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../context/UserContext";
import { printAsyncStorage } from "../../utils/functions";
import { router } from "expo-router";

const signIn: React.FC = () => {
  const { user, setUser, setIsLoggedIn, setIsLoading } = useUserContext();
  // const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      setUser(userData.user);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("@user", JSON.stringify(userData.user));
      const { idToken } = userData;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      setIsLoading(false);
      router.replace("/Dashboard");
      return auth().signInWithCredential(googleCredential);
      // setError("");
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-orange-500 flex-1 items-center justify-center">
        <Text className="text-3xl">Join the</Text>
        <Text className="text-4xl">DISRUPTORS</Text>
        <TouchableOpacity
          className="border border-black mt-5 p-5 rounded-lg"
          onPress={handleSignIn}
        >
          <View className="flex flex-row items-center justify-center gap-2">
            <FontAwesomeIcon icon={faGoogle} color="white" size={20} />
            <Text className="text-xl text-white font-bold ">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default signIn;
