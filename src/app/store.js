import {configureStore} from "@reduxjs/toolkit"
import loginMemberReducer from "../component/Manager/store/login";
import memeberReducer from "../component/Manager/store/memeber";
import logManager from "../component/Manager/store/log";
import tableManager from "../component/Manager/store/table";
import boardManager from "../component/Manager/store/board";
import bannerManager from "../component/Manager/store/banner";
import inqury from "../component/Manager/store/inqury";

export default configureStore({
    reducer : {
        loginMember : loginMemberReducer,
        logManager : logManager,
        tableManager : tableManager,
        boardManager : boardManager,
        bannerManager : bannerManager,
        member : memeberReducer,
        inqury : inqury
    }
});