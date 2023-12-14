import {createSlice} from "@reduxjs/toolkit"

export const menuManger = createSlice({
    name : "mm",
    initialState : [],
    reducers : {
        inputAction : (state,action)=>{
            return action.payload;
        },
        addAction : (state,action) => {            
            state.push({board_name : action.payload.board_name, board_table : action.payload.board_table});
        },
        delAction : (state,action) =>{
            const findIndex = state.findIndex(e=>e.board_table === action.payload);
            state.splice(findIndex,1);
        }
    }
});

export const { inputAction, addAction, delAction } = menuManger.actions;