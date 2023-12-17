import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const inqury = createSlice({
    name : "inqury",
    initialState : [
        {
            seq : 1,
            email : "test@test.com",
            content : "문의는 이런식으로 들어갑니다",
            writer : "작성자1",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        },
        {
            seq : 1,
            email : "test@test.com",
            content : "문의는 이런식으로 들어갑니다",
            writer : "작성자1",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        }
    ],
    reducers : {
        
    }
});

export default inqury.reducer;