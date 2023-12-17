import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

export const logManager = createSlice({
    name : "logManager",
    initialState : [
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },
        {
            broswer : "safari",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },{
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },{
            broswer : "chrome",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 14)).format("YYYY-MM-DD")
        },
        {
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 20)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 11)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 3)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },
        {
            broswer : "safari",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },{
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },{
            broswer : "chrome",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 14)).format("YYYY-MM-DD")
        },
        {
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 20)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 11)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 3)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },
        {
            broswer : "safari",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },{
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },{
            broswer : "chrome",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 14)).format("YYYY-MM-DD")
        },
        {
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 20)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 11)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 3)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date()).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },
        {
            broswer : "safari",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 7)).format("YYYY-MM-DD")
        },{
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },{
            broswer : "chrome",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 5)).format("YYYY-MM-DD")
        },
        {
            broswer : "chrome",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 14)).format("YYYY-MM-DD")
        },
        {
            broswer : "firefox",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 20)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "desktop",
            wDate : moment(new Date().setDate(new Date().getDate() - 11)).format("YYYY-MM-DD")
        },
        {
            broswer : "edge",
            device : "mobile",
            wDate : moment(new Date().setDate(new Date().getDate() - 3)).format("YYYY-MM-DD")
        }
    ],
    reducers : {}
});

// export const {addAction,logout} = logManager.actions;

export default logManager.reducer;