// hooks/useCommitmentStatus.js
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useCommitmentStatus = (userId) => {
    const [commitments, setCommitments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("Commitments")
            .where("userId", "==", userId)
            .orderBy("createdOn", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    const fetchedCommitments = [];
                    querySnapshot.forEach((doc) => {
                        fetchedCommitments.push({
                            commitmentId: doc.id,
                            ...doc.data(),
                        });
                    });
                    setCommitments(fetchedCommitments);
                },
                (error) => {
                    console.error("Error fetching commitments: ", error);
                    setError(error);
                }
            );

        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, [userId]);

    useEffect(() => {
        if (commitments.length > 0) {
            setLoading(false);
        }
    }, [commitments]);

    return { commitments, loading, error };
};

export default useCommitmentStatus;
