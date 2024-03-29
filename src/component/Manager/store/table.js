import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const tableManager = createSlice({
    name : "tableManager",
    initialState : [
        {
            seq : 1,
            board_name : "게시판 1", // 게시판 이름
            board_table : "board_one", // 테이블 이름
            main : 'Y', // 메인 출력
            img : 'Y', // 이미지 가능
            writer : '어드민',
            wData : moment(new Date()).format('YYYY-MM-DD')
        },
    ],
    reducers : {
        addAction(state,action){ // 테이블생성
            // seq 마지막번호부터 1씩 상승
            let seq = 1;
            if(state.length > 0) seq = Number(state[state.length-1].seq + 1);

            const push = {
                seq,
                ...action.payload
            }

            state.push(push);
        },
        updatedAction(state,action){
            const rs = state.findIndex(e=>e.seq == action.payload.seq);
            if(rs > -1){
                state[rs] = action.payload;
            }
        },
        deleteAction(state,action){

            const rs = state.findIndex(e=>e.seq == action.payload);
            if(rs > -1){
                state.splice(rs,1);
            }

        },
        multipleDeleteAction(state,action){
            action.payload.forEach(e=>{
                const rs = state.findIndex(index=>index.seq == e);
                if(rs > -1){
                    state.splice(rs,1);
                }
            })
        },
    }
});

export const {addAction,deleteAction,multipleDeleteAction,updatedAction} = tableManager.actions;

export default tableManager.reducer;