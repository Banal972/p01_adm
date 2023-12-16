import {configureStore} from "@reduxjs/toolkit"
import loginMemberReducer from "../component/Manager/store/login";
import memeberReducer from "../component/Manager/store/memeber";
import { menuManger } from "../component/Manager/store/menu";
import { logManager } from "../component/Manager/store/log";

export default configureStore({
    reducer : {
        loginMember : loginMemberReducer,
        member : memeberReducer,
        logManager : logManager.reducer,
        mm : menuManger.reducer,
    }
});