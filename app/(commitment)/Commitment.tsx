import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import useCommitments from "../hooks/useCommitments";
import RenderCommitmentItem from "../components/RenderCommitmentItem";

const Commitment = () => {
    const { user } = useUserContext();
    const { commitments, error } = useCommitments(user.id);

    return (
        <View className="flex-1 p-4">
            <FlatList
                data={commitments}
                renderItem={({ item }) => <RenderCommitmentItem item={item} />}
                keyExtractor={(item) => item.commitmentId}
                ListEmptyComponent={
                    <Text className="mx-auto">No commitments found</Text>
                }
            />
            <TouchableOpacity
                className="absolute right-2 bottom-8"
                onPress={() => router.push("/AddCommitment")}
            >
                <Ionicons name="add-circle" size={70} color="orange" />
            </TouchableOpacity>
        </View>
    );
};

export default Commitment;
