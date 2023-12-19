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
        addBoard(state,action){
            const push = {
                board_table : action.payload,
                data : []
            }
            state.push(push);
        },
        addAction(state,action){

            const rs = state.findIndex(e=>e.board_table == action.payload.table);

            if(rs > -1){
                let seq = 1;
                if(state[rs].data.length > 0){
                    seq = state[rs].data[state[rs].data.length - 1].seq + 1;
                }
                const push = {
                    seq,

                }
                state[rs].data.push(action.payload.data)
            }

        },
        updatedAction(state,action){
            const rs = state.findIndex(e=>e.seq == action.payload.seq);
            if(rs > -1){
                state[rs] = action.payload;
            }
        },
        deleteAction(state,action){
            const {seq,table} = action.payload

            const ta_index = state.findIndex(e=>e.board_table == table);
            if(ta_index > -1){

                const rs = state[ta_index].data.findIndex(e=>e.seq == seq);
                if(rs > -1){
                    state[ta_index].data.splice(rs,1);
                }

            }
            
        },
        multipleDeleteAction(state,action){

            const {seq,table} = action.payload;

            const ta_index = state.findIndex(e=>e.board_table == table);
            if(ta_index > -1){

                seq.forEach(e=>{
                    const rs = state[ta_index].data.findIndex(index=>index.seq == e);
                    if(rs > -1){
                        state[ta_index].data.splice(rs,1);
                    }
                });

            }

        },
    }
});

export const {addBoard,addAction,deleteAction,multipleDeleteAction} = boardManager.actions;

export default boardManager.reducer;