import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DailyReflectionForm from "../../components/DailyReflectionForm";
import { fetchCommitments } from "../../../utils/functions";
import { useUserContext } from "../../../context/UserContext";

const Home = () => {
    const [commitments, setCommitments] = useState([]);
    const { user } = useUserContext();
    useEffect(() => {
        // Fetch Commitments
        const fetchCommitmentsData = async () => {
            try {
                const commitmentsData = await fetchCommitments(user.id);
                setCommitments(commitmentsData);
            } catch (error) {
                console.error("Error fetching commitments:", error);
            }
        };

        fetchCommitmentsData();
    }, []);
    return (
        <ScrollView className="flex-1">
            <View className="flex-1">
                <Text className="mx-auto font-bold text-2xl mt-1">
                    Reflection Form
                </Text>
                <Text className="mx-auto font-semibold text-lg mt-2 mb-2">
                    ({commitments[0]?.habitName})
                </Text>
                <DailyReflectionForm commitmentId={commitments[0]?.logId} />
            </View>
        </ScrollView>
    );
};

export default Home;
