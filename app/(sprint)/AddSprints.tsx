import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import SprintForm from "../components/SprintForm";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddSprint = () => {
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
                    Create your sprint
                </Text>
                <SprintForm />
            </View>
        </ScrollView>
    );
};

export default AddSprint;
