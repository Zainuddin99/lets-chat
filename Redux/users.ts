import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../TS Types/redux.types";

const initialState: UserState = {
    email: "",
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        saveUser(state, action) {
            state.email = action.payload;
        }
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { saveUser } = actions;
// Export the reducer, either as a default or named export
export default reducer;
