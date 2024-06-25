import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";
import { fetchCommitments } from "../../utils/functions";

const renderCommitmentItem = ({ item }) => (
  <TouchableOpacity className="bg-gray-100 p-4 mb-4 rounded-lg">
    <Text className="text-lg font-bold mb-1">{item.habitName}</Text>
    <Text className="text-base mb-1">{item.habitDescription}</Text>
    <Text className="text-sm text-gray-500">
      Gateway: {item.gatewayStatement} | Plus: {item.plusStatement} | Elite:{" "}
      {item.eliteStatement}
    </Text>
  </TouchableOpacity>
);
const Commitment = () => {
  const [commitments, setCommitments] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    const fetchCommitmentsData = async () => {
      try {
        const commitmentsData = await fetchCommitments(user.id);
        setCommitments(commitmentsData);
        console.log(commitmentsData); // Logging fetched commitments for verification
      } catch (error) {
        console.error("Error fetching commitments:", error);
      }
    };

    fetchCommitmentsData();
  }, []);

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={commitments}
        renderItem={renderCommitmentItem}
        keyExtractor={(item) => item.commitmentid}
        ListEmptyComponent={<Text>No commitments found</Text>}
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
