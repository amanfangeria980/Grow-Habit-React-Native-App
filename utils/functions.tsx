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
      console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
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
      // console.log("User does not exist.");
      return false;
    }
  } catch (error) {
    console.error("Error checking user existence: ", error);
    return false; // or you could throw an error, based on your use case
  }
}
