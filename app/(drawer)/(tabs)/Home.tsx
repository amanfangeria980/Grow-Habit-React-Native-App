import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DailyReflectionForm from "../../components/DailyReflectionForm";
import { isReflectionSheetFilledForToday } from "../../../utils/functions";
import { useUserContext } from "../../../context/UserContext";
import useCommitments from "../../hooks/useCommitments";
import Loading from "../../components/Loading";
import useSprintJoinStatus from "../../hooks/useSprintJoinStatus";
import { router } from "expo-router";

const Home = () => {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const { commitments } = useCommitments(user.id);
    const [isFilled, setIsFilled] = useState(false);
    const { isJoined: sprintStatus } = useSprintJoinStatus(user.id);
    console.log(sprintStatus);
    useEffect(() => {
        const checkReflection = async () => {
            setLoading(true);
            const filled = await isReflectionSheetFilledForToday(
                commitments[0]?.logId
            );
            setLoading(false);
            setIsFilled(filled);
        };
        checkReflection();
    }, [commitments, isFilled]);
    if (loading) return <Loading />;
    if (!sprintStatus) {
        return (
            <View className="flex-1 items-center justify-center gap-5">
                <View>
                    <Text className="text-2xl text-orange-400">
                        You have not joined any sprint for
                    </Text>
                    <Text className="text-2xl text-white font-semibold bg-orange-400">
                        this month!
                    </Text>
                </View>
                <TouchableOpacity
                    className="bg-orange-400 border border-black p-4 rounded-md"
                    onPress={() => router.push("Sprint")}
                >
                    <Text className="text-2xl">Join a sprint now!</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
