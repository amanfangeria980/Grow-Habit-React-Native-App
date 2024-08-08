// hooks/useSprintJoinStatus.js
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useSprintJoinStatus = (userId) => {
    const [isJoined, setIsJoined] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkSprintJoinStatus = async () => {
            try {
                const userDoc = await firestore()
                    .collection("Users")
                    .doc(userId)
                    .get();
                const userData = userDoc.data();
                const sprintsJoined = userData?.sprintsJoined || [];

                if (sprintsJoined.length > 0) {
                    const lastSprint = sprintsJoined[sprintsJoined.length - 1];
                    const lastSprintJoinMonth = lastSprint.joinedOn
                        .toDate()
                        .getMonth();
                    const thisMonth = new Date().getMonth();

                    setIsJoined(lastSprintJoinMonth >= thisMonth);
                } else {
                    setIsJoined(false);
                }
            } catch (error) {
                console.error("Error checking sprint join status: ", error);
                setError(error);
                // setIsJoined(false);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            checkSprintJoinStatus();
        }
    }, []);

    return { isJoined, loading, error };
};

export default useSprintJoinStatus;
