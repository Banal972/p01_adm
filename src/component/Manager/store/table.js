import { createSlice } from "@reduxjs/toolkit"

export const tableManager = createSlice({
    name : "tableManager",
    initialState : [
        {
            board_name : "게시판 1", // 게시판 이름
            board_table : "board_one", // 테이블 이름
            main : 'Y', // 메인 출력
            img : 'Y', // 이미지 가능
            writer : '어드민'
        },
        {
            board_name : "게시판 2", // 게시판 이름
            board_table : "board_two", // 테이블 이름
            main : 'Y', // 메인 출력
            img : 'N', // 이미지 가능
            writer : '어드민'
        }
    ],
    reducers : {
    }
});

export default tableManager.reducer;