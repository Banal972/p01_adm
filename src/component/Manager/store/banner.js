import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const bannerManager = createSlice({
    name : "bannerManager",
    initialState : [
        {
            seq : 1,
            title : "배너1",
            content : "배너의 내용입니다",
            imgURL : "https://picsum.photos/1920/1080",
            main : "Y",
            writer : "어드민",
            wtDate : moment(new Date()).format("YYYY-MM-DD")
        },
    ],
    reducers : {
        addAction(state,action){
            // seq 마지막번호부터 1씩 상승
            let seq = 1;
            if(state.length > 0){
                seq = Number(state[state.length-1].seq + 1);
            }

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

export const {addAction,deleteAction,multipleDeleteAction,updatedAction} = bannerManager.actions;

export default bannerManager.reducer;