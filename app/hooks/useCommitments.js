import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useCommitments = (userId) => {
    const [commitments, setCommitments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("Commitments")
            .where("userId", "==", userId)
            .orderBy("createdOn", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    const fetchedCommitments = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        fetchedCommitments.push({
                            commitmentId: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                    setCommitments(fetchedCommitments);
                },
                (error) => {
                    console.error(
                        "Error fetching commitments collection: ",
                        error
                    );
                    setError(error);
                    setCommitments([]);
                }
            );

        return () => unsubscribe();
    }, [userId]);

    return { commitments, error };
};

export default useCommitments;
