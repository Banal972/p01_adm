import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const memeber = createSlice({
    name : "memeber",
    initialState : [
        {
            seq : 1,
            userID : 'admin01',
            userPW : "qwer1234",
            nickName : "어드민",
            rank : 10,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 2,
            userID : 'test01',
            userPW : "qwer1234",
            nickName : "테스트",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        }
    ],
    reducers : {
        addAction(state,action){ // 회원가입

            // seq 마지막번호부터 1씩 상승
            const seq = state[state.length-1].seq + 1;

            const {id,nickName,pw,rank} = action.payload;

            const pushData = {
                seq : seq,
                userID : id,
                userPW : pw,
                nickName : nickName,
                rank : rank,
                wtDate : moment(new Date()).format("YYYY-MM-DD")
            }

            state.push(pushData);

        },
        deleteAction(state,action){

            const rs = state.findIndex(e=>e.seq == action.payload);
            if(rs > -1){
                state.splice(rs,1);
            }

        },
        updateRank(state,action){
            const rs = state.findIndex(e=>e.seq == action.payload.seq);

            const pushData = {
                rank : action.payload.rank
            }

            state[rs] = {
                ...state[rs],
                ...pushData
            };
        },
        updateAction(state,action){

            const rs = state.findIndex(e=>e.seq == action.payload.seq);

            state[rs] = {
                ...state[rs],
                ...action.payload
            };

        }
    }
});

export const {addAction,deleteAction,updateAction,updateRank} = memeber.actions;

export default memeber.reducer;