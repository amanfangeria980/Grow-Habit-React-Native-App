import { MaterialCommunityIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const RenderCommitmentItem = ({ item }) => {
    const handleDelete = async () => {
        try {
            await firestore()
                .collection("Commitments")
                .doc(item.commitmentId)
                .delete();
            Alert.alert("Success", "Commitment deleted successfully!");
        } catch (error) {
            console.error("Error deleting commitment: ", error);
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

export default RenderCommitmentItem;
