import {configureStore} from "@reduxjs/toolkit"
import lmReducer from "../component/Manager/store/login";
import { menuManger } from "../component/Manager/store/menu";

export default configureStore({
    reducer : {
        lm : lmReducer,
        mm : menuManger.reducer
    }
});