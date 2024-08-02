import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import { object, string, number, date, boolean } from "yup";
import firestore from "@react-native-firebase/firestore";
let logSchema = object({
    createdOn: date().default(() => new Date()),
    commitmentStatus: string().required("Please enter Commitment Status!"),
    comradeConnectStatus: string().required(
        "Please enter Comrade Connect Status!"
    ),
    cueStatus: string().required("Please enter Cue Status!"),
    reflection: string().required("Please enter Elite Statement!"),
});

const DailyReflectionForm = (props) => {
    const addToFirebase = async (values) => {
        // // to change
        // const logs = await firestore().collection("Logs").add({
        //   logBook: [],
        // });

        // await firestore()
        //   .collection("Commitments")
        //   .add({
        //     ...values,
        //   });
        console.log(values);
    };
    return (
        <Formik
            initialValues={{
                createdOn: new Date(),
                commitmentStatus: "",
                comradeConnectStatus: "",
                cueStatus: "",
                reflection: "",
            }}
            onSubmit={(values, { resetForm }) => {
                console.log(JSON.stringify(values, null, 2));
                // addToFirebase(values);
                // router.back();
                console.log("Added the log");
                resetForm();
            }}
            validationSchema={logSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View className="mx-2 mb-8">
                    <View className="mb-5">
                        <Text className="text-xl mb-2">
                            Did you complete the commitment ?
                        </Text>
                        <View className="border border-orange-500">
                            <Picker
                                selectedValue={values.commitmentStatus}
                                onValueChange={handleChange("commitmentStatus")}
                                onBlur={handleBlur("commitmentStatus")}
                            >
                                <Picker.Item
                                    label="Select an option"
                                    value=""
                                />
                                <Picker.Item
                                    label="Yes(Gateway)"
                                    value="Yes(Gateway)"
                                />
                                <Picker.Item
                                    label="Yes(Plus)"
                                    value="Yes(Plus)"
                                />
                                <Picker.Item
                                    label="Yes(Elite)"
                                    value="Yes(Elite)"
                                />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        {errors.commitmentStatus && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.commitmentStatus}
                            </Text>
                        )}
                    </View>
                    <View className="mb-5">
                        <Text className="text-xl mb-2">
                            Did you make time to connect with your comrade ?
                        </Text>
                        <View className="border border-orange-500">
                            <Picker
                                selectedValue={values.comradeConnectStatus}
                                className="border border-orange-500 max-h-24 text-xl p-2"
                                onValueChange={handleChange(
                                    "comradeConnectStatus"
                                )}
                                onBlur={handleBlur("comradeConnectStatus")}
                            >
                                <Picker.Item
                                    label="Select an option"
                                    value=""
                                />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        {errors.comradeConnectStatus && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.comradeConnectStatus}
                            </Text>
                        )}
                    </View>
                    <View className="mb-5">
                        <Text className="text-xl mb-2">
                            Did you perform the habit statement at your decided
                            cue ?
                        </Text>
                        <View className="border border-orange-500">
                            <Picker
                                selectedValue={values.cueStatus}
                                className="border border-orange-500 max-h-24 text-xl p-2"
                                onValueChange={handleChange("cueStatus")}
                                onBlur={handleBlur("cueStatus")}
                            >
                                <Picker.Item
                                    label="Select an option"
                                    value=""
                                />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        {errors.cueStatus && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.cueStatus}
                            </Text>
                        )}
                    </View>
                    <View className="mb-5">
                        <Text className="text-xl mb-2">📋 Reflection: </Text>
                        <TextInput
                            onChangeText={handleChange("reflection")}
                            onBlur={handleBlur("reflection")}
                            value={values.reflection}
                            className="border border-orange-500 min-h-24 text-xl p-2"
                            multiline={true}
                            textAlignVertical="top"
                        />
                        {errors.reflection && (
                            <Text className="text-red-500 mt-1 text-lg">
                                {errors.reflection}
                            </Text>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="border-2  bg-orange-500 w-40 mx-auto p-4 rounded-lg"
                        >
                            <Text className="text-center text-xl">
                                Submit 🙆
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};
export default DailyReflectionForm;
