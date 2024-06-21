import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import CommitmentForm from "./../components/CommitmentForm";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddCommitment = () => {
  return (
    <ScrollView className="flex-1 bg-gray-200 relative">
      <TouchableOpacity
        className="absolute right-2 top-2 "
        onPress={() => router.back()}
      >
        <MaterialIcons name="cancel" size={60} color="red" />
      </TouchableOpacity>
      <View className="flex-1 mt-10">
        <Text className="text-3xl mx-auto mb-5 text-orange-500 font-bold underline">
          Let's Commit...
        </Text>
        <CommitmentForm />
      </View>
    </ScrollView>
  );
};

export default AddCommitment;
