import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";

const SprintInformation = () => {
    const { data } = useLocalSearchParams();

    // Deserialize the data
    const sprintData = JSON.parse(data);

    const handleInvite = () => {
        // Add your invite logic here
        console.log("Invite button pressed");
    };

    const handleJoin = () => {
        // Add your join logic here
        console.log("Join button pressed");
    };

    return (
        <View className="flex">
            <View className="flex p-4 bg-gray-100 items-center justify-center">
                <Text className="text-2xl font-bold mb-4 underline">
                    Sprint Information
                </Text>
                <Text className="text-lg font-semibold mb-1">Sprint Name:</Text>
                <Text className="text-base mb-4">{sprintData.sprintName}</Text>
                <Text className="text-lg font-semibold mb-1">Sprint Goal:</Text>
                <Text className="text-base mb-4">{sprintData.sprintGoal}</Text>
                <Text className="text-lg font-semibold mb-1">Created By:</Text>
                <Text className="text-base mb-4">{sprintData.createdBy}</Text>
                <Text className="text-lg font-semibold mb-1">
                    Members Joined:
                </Text>
                <Text className="text-base mb-4">
                    {sprintData.membersJoined.length}
                </Text>
            </View>
            <View className="flex-row justify-around">
                <TouchableOpacity
                    className="bg-blue-500 p-3 w-24 rounded-lg flex-row items-center justify-center"
                    onPress={handleInvite}
                >
                    <Text className="text-white text-center text-base font-semibold">
                        Invite{" "}
                    </Text>
                    <Entypo name="link" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-green-500 p-3 w-24 rounded-lg flex-row items-center justify-center"
                    onPress={handleJoin}
                >
                    <Text className="text-white text-center text-base font-semibold">
                        Join{"  "}
                    </Text>
                    <Ionicons name="cloud-done" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SprintInformation;
