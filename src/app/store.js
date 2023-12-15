import {configureStore} from "@reduxjs/toolkit"
import loginMemberReducer from "../component/Manager/store/login";
import memeberReducer from "../component/Manager/store/memeber";
import { menuManger } from "../component/Manager/store/menu";

export default configureStore({
    reducer : {
        loginMember : loginMemberReducer,
        member : memeberReducer,
        mm : menuManger.reducer,
    }
});