import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import DailyReflectionForm from "../../components/DailyReflectionForm";

const Home = () => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1">
        <Text className="mx-auto font-bold text-2xl mt-2">Today's Task</Text>
        <Text className="mx-auto font-bold text-2xl mt-2">Task Title</Text>
        <DailyReflectionForm />
      </View>
    </ScrollView>
  );
};

export default Home;
