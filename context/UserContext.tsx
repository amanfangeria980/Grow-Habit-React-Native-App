import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { getCurrentUser } from "../utils/functions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "287730716598-fda5snuovs28to27dne4uoljkl0mgfmj.apps.googleusercontent.com",
    });
    getCurrentUser()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setUser(data);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log("login status", isLoggedIn);
  console.log("user data", JSON.stringify(user, null, 2));
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        refreshing,
        setRefreshing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
