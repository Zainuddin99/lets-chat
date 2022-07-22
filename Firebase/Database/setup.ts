import { collection, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../setup";

export const firebaseDB = getFirestore(firebaseApp);

//Collections
export const usersFBCollection = collection(firebaseDB, "users");
export const roomsFBCollection = collection(firebaseDB, "rooms");

//FGunction to get subCollection Ref using id
export const messagesSubCollectionRef = (roomId: string) =>
    collection(firebaseDB, `rooms/${roomId}/messages`);

//Function to get reference Doc using id
export const roomDocRef = (id: string) => doc(firebaseDB, "rooms", id);
export const userDocRef = (id: string) => doc(firebaseDB, "users", id);

//Function to format Doc response to object
export const getDocData = (response: any) => {
    const { createdAt, updatedAt } = response.data();
    return {
        id: response.id,
        ...response.data(),
        createdAt: createdAt.toDate().toLocaleString(),
        updatedAt: updatedAt.toDate().toLocaleString(),
    };
};
//To format docs data
export const getDocsData = (response: any) => {
    const { createdAt, updatedAt } = response.data();
    return response.docs.map((item: any) => ({
        id: item.id,
        ...item.data(),
        createdAt: createdAt.toDate().toLocaleString(),
        updatedAt: updatedAt.toDate().toLocaleString(),
    }));
};
