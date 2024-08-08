import { View, Text } from "react-native";
import React from "react";

const Loading = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-semibold text-orange-400">
                Loading...
            </Text>
        </View>
    );
};

export default Loading;
