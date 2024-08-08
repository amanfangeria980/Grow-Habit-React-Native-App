import { View, Text } from "react-native";
import React from "react";
import useCommitments from "../hooks/useCommitments";
import { useUserContext } from "../../context/UserContext";

const OngoingSprint = () => {
    const { user } = useUserContext();
    const { commitments } = useCommitments(user.id);
    return (
        <View className="flex">
            <Text className="">OngoingSprint</Text>
        </View>
    );
};

export default OngoingSprint;
