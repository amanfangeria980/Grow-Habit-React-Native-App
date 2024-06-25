// Formik x React Native example
import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import { object, string, number, date } from "yup";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../../context/UserContext";
import {
  formatDateDDMMYYYY,
  formatTimeHHMMSS,
  getDayOfWeek,
} from "../../utils/functions";
let commitmentSchema = object({
  habitName: string().required("Please enter Habit Name!"),
  habitDescription: string().required("Please enter Habit Description!"),
  gatewayStatement: string().required("Please enter Gateway Statement!"),
  plusStatement: string().required("Please enter Plus Statement!"),
  eliteStatement: string().required("Please enter Elite Statement!"),
  // createdOn: date().default(() => new Date()),
});

const CommitmentForm = (props) => {
  const { user } = useUserContext();
  const addToFirebase = async (values) => {
    const currentTimeDate = new Date();
    const logs = await firestore().collection("Logs").add({
      logBook: [],
    });
    //   {
    //   date: formatDateDDMMYYYY(currentTimeDate),
    //   time: formatTimeHHMMSS(currentTimeDate),
    //   day: getDayOfWeek(currentTimeDate),
    //   commitmentStatus: false,
    //   comradeConnectStatus: false,
    //   cueStatus: false,
    //   reflection: "",
    // }

    await firestore()
      .collection("Commitments")
      .add({
        ...values,
        userId: user.id,
        logId: logs.id,
      });
  };
  return (
    <Formik
      initialValues={{
        habitName: "",
        habitDescription: "",
        gatewayStatement: "",
        plusStatement: "",
        eliteStatement: "",
        createdOn: new Date(),
      }}
      onSubmit={(values) => {
        // console.log(JSON.stringify(values, null, 2));
        addToFirebase(values);
        router.back();
      }}
      validationSchema={commitmentSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="mx-2 mb-8">
          <View className="mb-5">
            <Text className="text-xl mb-2">🎯 Habit Name: </Text>
            <TextInput
              onChangeText={handleChange("habitName")}
              onBlur={handleBlur("habitName")}
              value={values.habitName}
              className="border border-orange-500 max-h-24 text-xl p-2"
              multiline={true}
              textAlignVertical="top"
            />
            {errors.habitName && (
              <Text className="text-red-500 mt-1 text-lg">
                {errors.habitName}
              </Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="text-xl mb-2">📋 Habit Description: </Text>
            <TextInput
              onChangeText={handleChange("habitDescription")}
              onBlur={handleBlur("habitDescription")}
              value={values.habitDescription}
              className="border border-orange-500 h-50 text-xl p-2"
              multiline={true}
              textAlignVertical="top"
            />
            {errors.habitDescription && (
              <Text className="text-red-500 mt-1 text-lg">
                {errors.habitDescription}
              </Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="text-xl mb-2">Gateway Statement (🐤): </Text>
            <TextInput
              onChangeText={handleChange("gatewayStatement")}
              onBlur={handleBlur("gatewayStatement")}
              value={values.gatewayStatement}
              className="border border-orange-500 max-h-24 text-xl p-2"
              multiline={true}
              textAlignVertical="top"
            />
            {errors.gatewayStatement && (
              <Text className="text-red-500 mt-1 text-lg">
                {errors.gatewayStatement}
              </Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="text-xl mb-2">Plus Statement (⭐): </Text>
            <TextInput
              onChangeText={handleChange("plusStatement")}
              onBlur={handleBlur("plusStatement")}
              value={values.plusStatement}
              className="border border-orange-500 max-h-24 text-xl p-2"
              multiline={true}
              textAlignVertical="top"
            />
            {errors.plusStatement && (
              <Text className="text-red-500 mt-1 text-lg">
                {errors.plusStatement}
              </Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="text-xl mb-2">Elite Statement (🌟): </Text>
            <TextInput
              onChangeText={handleChange("eliteStatement")}
              onBlur={handleBlur("eliteStatement")}
              value={values.eliteStatement}
              className="border border-orange-500 max-h-24 text-xl p-2"
              multiline={true}
              textAlignVertical="top"
            />
            {errors.eliteStatement && (
              <Text className="text-red-500 mt-1 text-lg">
                {errors.eliteStatement}
              </Text>
            )}
          </View>
          <View className="mt-2">
            <TouchableOpacity
              onPress={handleSubmit}
              className="border-2  bg-orange-500 w-40 mx-auto p-4 rounded-lg"
            >
              <Text className="text-center text-xl">Commit 🙆</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
export default CommitmentForm;
