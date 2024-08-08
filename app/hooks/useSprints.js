// hooks/useSprints.js
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useSprints = () => {
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("Sprints")
            .orderBy("createdOn", "desc")
            .onSnapshot(
                (snapshot) => {
                    const sprintsData = snapshot.docs.map((doc) => doc.data());
                    setSprints(sprintsData);
                    setLoading(false);
                },
                (err) => {
                    console.error("Error fetching sprints collection: ", err);
                    setError(err);
                    setLoading(false);
                }
            );

        return () => unsubscribe();
    }, []);

    return { sprints, loading, error };
};

export default useSprints;
