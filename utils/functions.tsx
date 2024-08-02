import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";
import firestore from "@react-native-firebase/firestore";

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            let asyncStorage = {};
            stores.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1];
            });
            console.table(asyncStorage);
        });
    });
};

export const getCurrentUser = async () => {
    try {
        const user = await AsyncStorage.getItem("@user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function fetchAndPrintUsers() {
    try {
        const usersCollection = await firestore().collection("Users").get();
        console.log("Total users: ", usersCollection.size);

        usersCollection.forEach((documentSnapshot) => {
            console.log(
                "User ID: ",
                documentSnapshot.id,
                documentSnapshot.data()
            );
        });
    } catch (error) {
        console.error("Error fetching users collection: ", error);
    }
}

export async function checkUserExists(userId) {
    try {
        const userDocument = await firestore()
            .collection("Users")
            .doc(userId)
            .get();

        if (userDocument.exists) {
            // console.log("User exists: ", userDocument.id, userDocument.data());
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking user existence: ", error);
        return false;
    }
}

export const formatDateDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    return `${day}-${month}-${year}`;
};

export const formatTimeHHMMSS = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};

export const getDayOfWeek = (date) => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return daysOfWeek[date.getDay()];
};

export const fetchCommitments = async (userId) => {
    try {
        const commitments = [];
        const commitmentsCollection = await firestore()
            .collection("Commitments")
            .where("userId", "==", userId)
            .orderBy("createdOn", "desc")
            .get()
            .then((querySnapshot) => {
                // console.log("Total commitments: ", querySnapshot.size);
                querySnapshot.forEach((documentSnapshot) => {
                    commitments.push({
                        commitmentid: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
            });
        // console.log(commitments);
        return commitments;
    } catch (error) {
        console.log("Error fetching commitments collection: ", error);
        return [];
    }
};
