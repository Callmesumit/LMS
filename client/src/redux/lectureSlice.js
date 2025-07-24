import { createSlice } from "@reduxjs/toolkit";
// const { User } = require("lucide-react");
//import {User} from "lucide-react"
const lectureSlice = createSlice({
    name:"lecture",
    initialState:{
        lecture:null
    },
    reducers:{
        //action
        setLecture:(state, action) => {
            state.lecture = action.payload;
        }
    }
});

export const {setLecture} = lectureSlice.actions;
export default lectureSlice.reducer;