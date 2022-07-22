import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Message } from "./chat.types";
import { QueryDocumentSnapshotType } from "./firebase.types";
import { Rooms } from "./home.types";

//For redux
export type UserState = {
    email: string;
};

export type RoomsState = {
    roomsList: Rooms;
    loading: boolean;
};

export type ChatStates = {
    activeRoomId: string;
    name: string;
    participants: number;
    description: string;
    messages: Message[];
};
