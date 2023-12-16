import {configureStore} from "@reduxjs/toolkit"
import loginMemberReducer from "../component/Manager/store/login";
import memeberReducer from "../component/Manager/store/memeber";
import { menuManger } from "../component/Manager/store/menu";
import logManager from "../component/Manager/store/log";
import tableManager from "../component/Manager/store/table";

export default configureStore({
    reducer : {
        loginMember : loginMemberReducer,
        logManager : logManager,
        tableManager : tableManager,
        member : memeberReducer,
        mm : menuManger.reducer,
    }
});