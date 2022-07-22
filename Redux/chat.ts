import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoomData } from "../Firebase/Database/rooms";
import { ChatStates } from "../TS Types/redux.types";

const initialState: ChatStates = {
    activeRoomId: "",
    name: "",
    participants: 1,
    description: "",
    messages: [],
};

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addRoomMessages(state, action) {
            state.messages = [...action.payload, ...state.messages];
        },
        resetChatState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoomData.fulfilled, (state, actions) => {
            const { roomId, name, participants, description } = actions.payload;
            return {
                ...state,
                activeRoomId: roomId,
                name,
                participants,
                description,
            };
        });
    },
});

export const fetchRoomData = createAsyncThunk(
    "chats/setActiveRoomData",
    async (roomId: string) => {
        const response = await getRoomData(roomId);
        return response;
    }
);

const { actions, reducer } = chatsSlice;

export const { addRoomMessages, resetChatState } = actions;
export default reducer;
