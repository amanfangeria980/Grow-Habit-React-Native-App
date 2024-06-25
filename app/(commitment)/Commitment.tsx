import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import { fetchCommitments } from "../../utils/functions";
const Commitment = () => {
  const { user } = useUserContext();
  console.log(fetchCommitments(user.id));
  return (
    <View className="flex-1">
      <View className="relative flex-1">
        <TouchableOpacity
          className="absolute right-2 bottom-8"
          onPress={() => router.push("/AddCommitment")}
        >
          <Ionicons name="add-circle" size={70} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Commitment;
