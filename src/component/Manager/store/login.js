import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const loginManger = createSlice({
    name : "loginMember",
    initialState : {
        seq : 1,
        userID : 'admin01',
        userPW : "qwer1234",
        nickName : "어드민",
        rank : 10,
        wtDate : moment(new Date()).format("YYYY-MM-DD"),
    },
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