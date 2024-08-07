import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import AllSprints from "../../(sprint)/AllSprints";

const Sprint = () => {
    return (
        <View className="flex-1">
            <View className="flex-1 justify-center items-center gap-5">
                <Text className="text-2xl">----Create a new sprint----</Text>
                <TouchableOpacity
                    className="border border-orange-400 p-5 rounded-md"
                    onPress={() => router.push("AddSprints")}
                >
                    <Text className="text-xl font-semibold">
                        Create a Sprint
                    </Text>
                </TouchableOpacity>
                <Text className="text-2xl">----Or, you can join one----</Text>
                {/* <Text className="text-xl font-semibold">Join a Sprint</Text> */}
                <AllSprints />
            </View>
        </View>
    );
};

export default Sprint;
