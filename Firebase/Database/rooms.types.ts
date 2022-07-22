import { QueryDocumentSnapshotType } from "../../TS Types/firebase.types";
import { Rooms } from "../../TS Types/home.types";

export type AllRoomsResponse = {
    rooms: Rooms;
    noMoreRooms: boolean;
    lastDocumentSnap: QueryDocumentSnapshotType;
};
