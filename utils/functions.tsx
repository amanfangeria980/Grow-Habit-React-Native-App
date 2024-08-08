import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";
import firestore from "@react-native-firebase/firestore";
import { G } from "react-native-svg";

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

export const getMonthUtil = (monthNum) => {
    const monthsOfYear = [
        { name: "January", number: 1 },
        { name: "February", number: 2 },
        { name: "March", number: 3 },
        { name: "April", number: 4 },
        { name: "May", number: 5 },
        { name: "June", number: 6 },
        { name: "July", number: 7 },
        { name: "August", number: 8 },
        { name: "September", number: 9 },
        { name: "October", number: 10 },
        { name: "November", number: 11 },
        { name: "December", number: 12 },
    ];
    return monthsOfYear[monthNum];
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

export async function fetchSprints() {
    try {
        let sprints = [];
        const sprintsCollection = await firestore()
            .collection("Sprints")
            .orderBy("createdOn", "desc")
            .get();
        // console.log("Total sprints: ", sprintsCollection.size);

        sprintsCollection.forEach((documentSnapshot) => {
            sprints.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
            });
        });
        // console.log(sprints);
        return sprints;
    } catch (error) {
        console.error("Error fetching sprints collection: ", error);
    }
    // console.log(sprints);
}

export const isReflectionSheetFilledForToday = async (logId) => {
    const data = await firestore()
        .collection("Logs")
        .doc(logId)
        .get()
        .then((documentSnapshot) => {
            return documentSnapshot.data();
        });
    const logBook = data?.logBook || [];
    if (logBook.length === 0) {
        return false;
    }
    const today = new Date().toISOString().split("T")[0];
    const lastEntry = logBook[logBook.length - 1];
    const logDate = lastEntry.createdOn.toDate().toISOString().split("T")[0];
    return logDate === today;
};

export const checkSprintJoinStatus = async (userId) => {
    try {
        const userDoc = await firestore().collection("Users").doc(userId).get();

        const userData = userDoc.data();
        const sprintsJoined = userData.sprintsJoined || [];
        if (sprintsJoined.length > 0) {
            const lastSprint = sprintsJoined[sprintsJoined.length - 1];

            const lastSprintJoinMonth = lastSprint.joinedOn.toDate().getMonth();
            const thisMonth = new Date().getMonth();
            if (lastSprintJoinMonth >= thisMonth) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error checking sprint join status: ", error);
        return false;
    }
};
