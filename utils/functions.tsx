import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";

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