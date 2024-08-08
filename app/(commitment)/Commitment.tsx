import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import { deleteCommitment, fetchCommitments } from "../../utils/functions";

const renderCommitmentItem = ({ item, setRefreshing }) => {
    const handleDelete = async () => {
        try {
            setRefreshing(true);
            await deleteCommitment(item.commitmentId);
        } catch (error) {
            console.error("Error deleting commitment:", error);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <TouchableOpacity className="bg-gray-100 p-4 mb-4 rounded-lg border border-orange-500">
            <View className="flex-row justify-between">
                <Text className="text-lg font-bold mb-1">{item.habitName}</Text>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="orange"
                    />
                </TouchableOpacity>
            </View>
            <Text className="text-base mb-1">{item.habitDescription}</Text>
            <Text className="text-sm text-gray-500">
                Gateway: {item.gatewayStatement}
            </Text>
            <Text className="text-sm text-gray-500">
                Plus: {item.plusStatement}
            </Text>
            <Text className="text-sm text-gray-500">
                Elite: {item.eliteStatement}
            </Text>
        </TouchableOpacity>
    );
};
const Commitment = () => {
    const { refreshing, setRefreshing } = useUserContext();
    const [commitments, setCommitments] = useState([]);
    const { user } = useUserContext();
    useEffect(() => {
        const fetchCommitmentsData = async () => {
            try {
                const commitmentsData = await fetchCommitments(user.id);
                setCommitments(commitmentsData);
            } catch (error) {
                console.error("Error fetching commitments:", error);
            }
        };
        console.log("hello");

        fetchCommitmentsData();
        setRefreshing(false);
        console.log("hello");
    }, [refreshing]);

    return (
        <View className="flex-1 p-4">
            <FlatList
                data={commitments}
                renderItem={({ item }) =>
                    renderCommitmentItem({ item, setRefreshing })
                }
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
