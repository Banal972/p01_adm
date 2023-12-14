import { createSlice } from "@reduxjs/toolkit"

export const loginManger = createSlice({
    name : "lm",
    initialState : {},
    reducers : {
        addAction : (state,action) => {
            return action.payload
        }
    }
});

export const {addAction} = loginManger.actions;

export default loginManger.reducer;