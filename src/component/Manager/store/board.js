import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const boardManager = createSlice({
    name : "boardManager",
    initialState : [
        {
            board_table : "board_one",
            data : [
                {
                    seq : 1,
                    title : "게시글",
                    content : "게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다.",
                    imgURL : "asdsad",
                    writer : "어드민",
                    wDate : moment(new Date()).format("YYYY-MM-DD")
                },
                {
                    seq : 2,
                    title : "게시글2",
                    content : "게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다.",
                    imgURL : "asdsad",
                    writer : "어드민",
                    wDate : moment(new Date()).format("YYYY-MM-DD")
                }
            ]
        },
        {
            board_table : "board_two",
            data : [
                {
                    seq : 1,
                    title : "게시판2_1",
                    content : "게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다.",
                    imgURL : "asdsad",
                    writer : "어드민",
                    wDate : moment(new Date()).format("YYYY-MM-DD")
                },
                {
                    seq : 2,
                    title : "게시판2_2",
                    content : "게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다. 게시물입니다.",
                    imgURL : "asdsad",
                    writer : "어드민",
                    wDate : moment(new Date()).format("YYYY-MM-DD")
                }
            ]
        }
    ],
    reducers : {
    }
});

export const {} = boardManager.actions;

export default boardManager.reducer;