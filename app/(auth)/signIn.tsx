import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const signIn: React.FC = () => {
  const handleLogin = () => {};
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-orange-500 flex-1 items-center justify-center">
        <Text className="text-3xl">Join the</Text>
        <Text className="text-4xl">DISRUPTORS</Text>
        <TouchableOpacity
          className="border border-black mt-5 p-5 rounded-lg"
          onPress={() => handleLogin()}
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
