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
            seq : 2,
            email : "test@test.com",
            content : "문의 입니다.",
            writer : "작성자2",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        }
    ],
    reducers : {
        addAction(state,action){
            let seq = 1;
            if(state.length > 0){
                seq =  Number(state[state.length - 1].seq + 1);
            }

            const pushData = {
                seq,
                ...action.payload,
                wDate : moment(new Date()).format("YYYY-MM-DD")
            }

            state.push(pushData);

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

export const {addAction,deleteAction,updatedAction,multipleDeleteAction} = inqury.actions;

export default inqury.reducer;