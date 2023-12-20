import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const memeber = createSlice({
    name : "member",
    initialState : [
        {
            seq : 1,
            userID : 'test',
            userPW : "xptmxmdlqslek123",
            nickName : "테스트 계정",
            rank : 5,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 2,
            userID : 'admin01',
            userPW : "a123456",
            nickName : "어드민",
            rank : 10,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        }
    ],
    reducers : {
        addAction(state,action){ // 회원가입

            // seq 마지막번호부터 1씩 상승
            let seq = 1;
            if(state.length > 0){
                seq = state[state.length-1].seq + 1;
            }

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
        multipleDeleteAction(state,action){
            action.payload.forEach(e=>{
                const rs = state.findIndex(index=>index.seq == e);
                if(rs > -1){
                    state.splice(rs,1);
                }
            })
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

export const { 
    addAction,
    deleteAction,
    updateAction,
    updateRank,
    multipleDeleteAction
} = memeber.actions;

export default memeber.reducer;