import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import { object, string, number, date } from "yup";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../../context/UserContext";

let sprintSchema = object({
    sprintName: string().required("Please enter Sprint Name!"),
    sprintGoal: string().required("Please enter Sprint Goal!"),
    // createdOn: date().default(() => new Date()),
});

const SprintForm = (props) => {
    const { user } = useUserContext();
    const addToFirebase = async (values) => {
        const docRef = await firestore()
            .collection("Sprints")
            .add({
                ...values,
            });

        await docRef.update({
            sprintId: docRef.id,
        });
    };
    return (
        <Formik
            initialValues={{
                sprintName: "",
                sprintGoal: "",
                status: false,
                createdOn: new Date(),
                createdBy: user.id,
                membersJoined: [],
            }}
            onSubmit={(values) => {
                // console.log(JSON.stringify(values, null, 2));
                addToFirebase(values);
                router.back();
            }}
            validationSchema={sprintSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View className="mx-2 mb-8">
                    <View className="mb-5">
                        <Text className="text-xl mb-2">🎯 Sprint Name: </Text>
                        <TextInput
                            onChangeText={handleChange("sprintName")}
                            onBlur={handleBlur("sprintName")}
                            value={values.sprintName}
                            className="border border-orange-500 max-h-24 text-xl p-2"
                            multiline={true}
                            textAlignVertical="top"
                        />
                        {errors.sprintName && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.sprintName}
                            </Text>
                        )}
                    </View>
                    <View className="mb-5">
                        <Text className="text-xl mb-2">📋 Sprint Goal: </Text>
                        <TextInput
                            onChangeText={handleChange("sprintGoal")}
                            onBlur={handleBlur("sprintGoal")}
                            value={values.sprintGoal}
                            className="border border-orange-500 h-50 text-xl p-2"
                            multiline={true}
                            textAlignVertical="top"
                        />
                        {errors.sprintGoal && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.sprintGoal}
                            </Text>
                        )}
                    </View>
                    {/* <View className="mb-5">
                        <Text className="text-xl mb-2">Add Members: </Text>
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
                    </View> */}

                    <View className="mt-2">
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="border-2  bg-orange-500 w-40 mx-auto p-4 rounded-lg"
                        >
                            <Text className="text-center text-xl">
                                Create 🙆
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};
export default SprintForm;
