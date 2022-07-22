import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import roomsReducer from "./rooms";
import chatsReducer from "./chat";

export const store = configureStore({
    reducer: {
        users: userReducer,
        rooms: roomsReducer,
        chats: chatsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export const { dispatch } = store;
