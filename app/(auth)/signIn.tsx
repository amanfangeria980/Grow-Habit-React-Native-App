import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const signIn: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "287730716598-fda5snuovs28to27dne4uoljkl0mgfmj.apps.googleusercontent.com",
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserData(user);
      setError("");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  console.log(userData);
  const handleLogout = async () => {
    setUserData(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-orange-500 flex-1 items-center justify-center">
        <Text className="text-3xl">Join the</Text>
        <Text className="text-4xl">DISRUPTORS</Text>
        {userData ? (
          <TouchableOpacity
            className="border border-black mt-5 p-5 rounded-lg"
            onPress={handleLogout}
          >
            <View className="flex flex-row items-center justify-center gap-2">
              {/* <FontAwesomeIcon icon={faGoogle} color="white" size={20} /> */}
              <Text className="text-xl text-white font-bold ">LogOut</Text>
            </View>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default signIn;
