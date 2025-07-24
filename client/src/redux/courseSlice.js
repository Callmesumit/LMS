import { createSlice } from "@reduxjs/toolkit";
// const { User } = require("lucide-react");
//import {User} from "lucide-react"
const courseSlice = createSlice({
    name:"course",
    initialState:{
        course:null
    },
    reducers:{
        //action
        setCourse:(state, action) => {
            state.course = action.payload;
        }
    }
});

export const {setCourse} = courseSlice.actions;
export default courseSlice.reducer;