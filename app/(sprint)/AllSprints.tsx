import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import { fetchSprints, getMonthUtil } from "../../utils/functions";

const renderSprintItem = ({ item }) => (
    <TouchableOpacity className="bg-gray-100 p-4 mb-4 rounded-lg">
        <Text className="text-lg font-bold mb-1">{item.sprintName}</Text>
        <Text className="text-base mb-1">{item.sprintGoal}</Text>
        <Text className="text-base mb-1">
            Starts from{" "}
            {getMonthUtil(item.createdOn.toDate().getMonth() + 1).name}
        </Text>
        <Text className="text-base mb-1">Created by: {item.createdBy}</Text>
        <TouchableOpacity>
            <Text>See more & join</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);
const AllSprints = () => {
    const { refreshing, setRefreshing } = useUserContext();
    const [sprints, setSprints] = useState([]);
    // const { user } = useUserContext();
    useEffect(() => {
        const loadSprints = async () => {
            const data = await fetchSprints(); // Wait for the data to be fetched
            setSprints(data); // Update the state with the fetched data
            setRefreshing(false);
        };

        loadSprints();
        setRefreshing(false);
    }, [refreshing]);

    return (
        <View className="flex-1 p-4">
            <FlatList
                data={sprints}
                renderItem={renderSprintItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text className="mx-auto">No sprints</Text>}
            />
        </View>
    );
};

export default AllSprints;
