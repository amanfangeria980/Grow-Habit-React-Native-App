import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import { fetchSprints, getMonthUtil } from "../../utils/functions";

const renderSprintItem = ({ item }) => (
    <TouchableOpacity
        className="bg-white p-5 mb-4 rounded-lg shadow-lg"
        onPress={() =>
            router.push({
                pathname: "SprintInformation",
                params: { data: JSON.stringify(item) },
            })
        }
    >
        <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-semibold text-gray-800">
                {item.sprintName}
            </Text>
            <Ionicons
                name="chevron-forward-circle-sharp"
                size={24}
                color="orange"
            />
        </View>
        <Text className="text-base text-gray-600 mb-2">{item.sprintGoal}</Text>
        <Text className="text-sm text-gray-500 mb-1">
            Starts from{" "}
            <Text className="font-medium text-gray-800">
                {getMonthUtil(item.createdOn.toDate().getMonth() + 1).name}
            </Text>
        </Text>
        <Text className="text-sm text-gray-500">
            Created by: {item.createdBy}
        </Text>
        <Text className="text-sm text-gray-500">
            Members Joined:
            {item.membersJoined.length}
        </Text>
    </TouchableOpacity>
);

const AllSprints = () => {
    const { refreshing, setRefreshing } = useUserContext();
    const [sprints, setSprints] = useState([]);
    // const { user } = useUserContext();
    useEffect(() => {
        const loadSprints = async () => {
            const data = await fetchSprints();
            setSprints(data);
            setRefreshing(false);
        };
        loadSprints();
    }, [refreshing]);

    return (
        <View className="flex-1 p-4">
            <FlatList
                data={sprints}
                renderItem={renderSprintItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text className="mx-auto">No sprints</Text>}
                showsVerticalScrollIndicator={false} // Hide the scrollbar
            />
        </View>
    );
};

export default AllSprints;
