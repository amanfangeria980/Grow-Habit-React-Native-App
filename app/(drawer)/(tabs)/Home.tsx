import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DailyReflectionForm from "../../components/DailyReflectionForm";
import {
    fetchCommitments,
    isReflectionSheetFilledForToday,
} from "../../../utils/functions";
import { useUserContext } from "../../../context/UserContext";
import useCommitments from "../../hooks/useCommitments";

const Home = () => {
    const { user } = useUserContext();
    const { commitments } = useCommitments(user.id);
    const [isFilled, setIsFilled] = useState(false);
    useEffect(() => {
        const checkReflection = async () => {
            const filled = await isReflectionSheetFilledForToday(
                commitments[0]?.logId
            );
            setIsFilled(filled);
        };
        checkReflection();
    }, [commitments, isFilled]);
    return (
        <ScrollView className="flex-1">
            <View className="flex-1">
                <Text className="mx-auto font-bold text-2xl mt-1">
                    Reflection Form
                </Text>
                <Text className="mx-auto font-semibold text-lg mt-2 mb-2">
                    ({commitments[0]?.habitName})
                </Text>
                {isFilled ? (
                    <Text className="text-2xl font-semibold mx-auto mt-52">
                        Already Filled :)
                    </Text>
                ) : (
                    <DailyReflectionForm commitmentId={commitments[0]?.logId} />
                )}
            </View>
        </ScrollView>
    );
};

export default Home;
