import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "expo-dev-client";
import { useUserContext } from "../context/UserContext";
export default function App() {
  const { isLoggedIn, isLoading } = useUserContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/Home" />;
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-orange-500 flex-1 items-center justify-center">
        <View className="flex gap-3">
          <Text className="text-3xl font-semibold text-white">Welcome to </Text>
          <Text className="text-5xl font-bold text-white">Grow Habit</Text>
        </View>
        <TouchableOpacity
          className="border border-black mt-5 p-5 rounded-lg"
          onPress={() => router.push("/signIn")}
        >
          <Text className="text-xl">Let's grow together!</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
