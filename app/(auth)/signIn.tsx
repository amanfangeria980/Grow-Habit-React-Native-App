import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../context/UserContext";
import { router } from "expo-router";
import { checkUserExists } from "../../utils/functions";

const SignIn: React.FC = () => {
    const { setUser, setIsLoggedIn, setIsLoading } = useUserContext();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userData = await GoogleSignin.signIn();
            setUser(userData.user);
            setIsLoggedIn(true);
            await AsyncStorage.setItem("@user", JSON.stringify(userData.user));
            const { idToken } = userData;
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);

            const userExists = await checkUserExists(userData.user.id);
            if (!userExists) {
                await firestore()
                    .collection("Users")
                    .doc(userData.user.id)
                    .set({
                        firstName: userData.user.givenName,
                        lastName: userData.user.familyName,
                        email: userData.user.email,
                        userPhoto: userData.user.photo,
                        dob: "",
                        phoneNumber: "",
                        gender: "",
                        about: "",
                        place: "",
                        takatakStatus: false,
                        sprintsJoined: [],
                    });
                // console.log("User added to Firestore!");
            }

            await auth().signInWithCredential(googleCredential);

            router.replace("/Home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false);
            setIsSigningIn(false);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="bg-orange-500 flex-1 items-center justify-center">
                <Text className="text-3xl">Join the</Text>
                <Text className="text-4xl">DISRUPTORS</Text>
                {isSigningIn ? (
                    <ActivityIndicator
                        size="large"
                        color="#ffffff"
                        className="mt-5"
                    />
                ) : (
                    <TouchableOpacity
                        className="border border-black mt-5 p-5 rounded-lg"
                        onPress={handleSignIn}
                    >
                        <View className="flex flex-row items-center justify-center gap-2">
                            <AntDesign name="google" size={24} color="white" />
                            <Text className="text-xl text-white font-bold ">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export default SignIn;
