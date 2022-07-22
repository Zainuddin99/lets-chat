import { UserBasicData } from "./chat.types";

export type NewRoomInputs = {
    name: string;
    description: string;
    privateRoom: boolean;
};

export type MaxInputsLength = {
    name: number;
    description: number;
};

export type MinInputsLengthCriteria = {
    name: number;
    description: number;
};

export type HomePageProps = {
    rooms: Rooms[];
};

export type Room = {
    id: string;
    name: string;
    adminData: UserBasicData;
    description: string;
    createdAt: string;
    participants: number;
    privateRoom: boolean;
    alreadyRequested: boolean;
    joined: boolean;
};

export type Rooms = Room[];
