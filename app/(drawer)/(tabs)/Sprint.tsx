import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AllSprints from "../../components/AllSprints";
import { useUserContext } from "../../../context/UserContext";
import { checkSprintJoinStatus } from "../../../utils/functions";
import OngoingSprint from "../../components/OngoingSprint";
import Loading from "../../components/Loading";

const Sprint = () => {
    const { user } = useUserContext();
    const [sprintJoinedOrNot, setSprintJoinedOrNot] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSprintJoinStatus = async () => {
            const status = await checkSprintJoinStatus(user.id);
            setSprintJoinedOrNot(status);
            setLoading(false);
        };

        fetchSprintJoinStatus();
    }, []);
    if (loading) return <Loading />;
    return (
        <View className="flex-1 mt-1">
            {sprintJoinedOrNot ? (
                <OngoingSprint />
            ) : (
                <View className="flex-1 justify-center items-center gap-5">
                    <Text className="text-2xl">
                        ----Create a new sprint----
                    </Text>
                    <TouchableOpacity
                        className="border border-orange-400 p-5 rounded-md"
                        onPress={() => router.push("AddSprints")}
                    >
                        <Text className="text-xl font-semibold">
                            Create a Sprint
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-2xl">
                        ----Or, you can join one----
                    </Text>
                    <AllSprints />
                </View>
            )}
        </View>
    );
};

export default Sprint;
