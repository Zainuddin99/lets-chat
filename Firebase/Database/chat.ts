import {
    addDoc,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { promiseWrapper } from "../../utils/promiseWrapper";
import { firebaseAuth } from "../auth";
import { messagesSubCollectionRef } from "./setup";
import { fetchUserData } from "./users";

export const addMessage = promiseWrapper(
    async (roomId: string, messageText: string) => {
        const body = {
            messagedBy: firebaseAuth.currentUser?.uid,
            messagedOn: serverTimestamp(),
            text: messageText,
        };
        await addDoc(messagesSubCollectionRef(roomId), body);
    }
);

export const getRoomMessages = promiseWrapper(async (roomId: string) => {
    const response = await getDocs(messagesSubCollectionRef(roomId));
    let finalResponse: any = response.docs.map(async (item) => {
        return formatMessageWithUserData(item);
    });
    finalResponse = await Promise.all(finalResponse);
    return response;
});

export const formatMessageWithUserData = promiseWrapper(
    async (item: QueryDocumentSnapshot<DocumentData>) => {
        const currentUserId = firebaseAuth.currentUser?.uid;
        const { messagedBy, messagedOn } = item.data();
        let userData = null;
        if (messagedBy !== currentUserId) {
            const userResponse: any = await fetchUserData(messagedBy);
            const { id, firstName, lastName } = userResponse;
            userData = { id, firstName, lastName };
        }
        const moreData = {
            messagedBy: userData,
            loggedUser: messagedBy === currentUserId,
            messagedOn: messagedOn?.toDate().toLocaleString() || "Just now",
        };
        return { id: item.id, ...item.data(), ...moreData };
    }
);
