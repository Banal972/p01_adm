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
        },
        {
            seq : 3,
            userID : 'test02',
            userPW : "qwer1234",
            nickName : "테스트2",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 4,
            userID : 'test03',
            userPW : "qwer1234",
            nickName : "테스트3",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 5,
            userID : 'test04',
            userPW : "qwer1234",
            nickName : "테스트4",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 6,
            userID : 'test05',
            userPW : "qwer1234",
            nickName : "테스트5",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 7,
            userID : 'test06',
            userPW : "qwer1234",
            nickName : "테스트6",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 8,
            userID : 'test07',
            userPW : "qwer1234",
            nickName : "테스트7",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 9,
            userID : 'test08',
            userPW : "qwer1234",
            nickName : "테스트8",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 10,
            userID : 'test09',
            userPW : "qwer1234",
            nickName : "테스트9",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 11,
            userID : 'test10',
            userPW : "qwer1234",
            nickName : "테스트10",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 12,
            userID : 'test11',
            userPW : "qwer1234",
            nickName : "테스트11",
            rank : 4,
            wtDate : moment(new Date()).format("YYYY-MM-DD"),
        },
        {
            seq : 13,
            userID : 'test12',
            userPW : "qwer1234",
            nickName : "테스트12",
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