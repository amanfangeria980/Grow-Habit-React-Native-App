import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DailyReflectionForm from "../../components/DailyReflectionForm";
import { fetchCommitments } from "../../../utils/functions";
import { useUserContext } from "../../../context/UserContext";

const Home = () => {
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
        fetchCommitmentsData();
    }, []);
    return (
        <ScrollView className="flex-1">
            <View className="flex-1">
                <Text className="mx-auto font-bold text-2xl mt-2">
                    Today's Task
                </Text>
                <Text className="mx-auto font-bold text-2xl mt-2">
                    {commitments[commitments.length - 1]?.habitDescription}
                </Text>
                <DailyReflectionForm />
            </View>
        </ScrollView>
    );
};

export default Home;
