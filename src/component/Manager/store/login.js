import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const loginManger = createSlice({
    name : "loginMember",
    initialState : null,
    reducers : {
        addAction : (state,action) => {
            return action.payload;
        },
        logout : (state,action) => {
            return null;
        }
    }
});

export const {addAction,logout} = loginManger.actions;

export default loginManger.reducer;