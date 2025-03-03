import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getLocation = async () => {
    const querySnapshot = await getDocs(collection(db, "locations"));
    const locations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return locations;
}