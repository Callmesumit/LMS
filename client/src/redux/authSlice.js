import { createSlice } from "@reduxjs/toolkit";
// const { User } = require("lucide-react");
//import {User} from "lucide-react"
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        //action
        setUser:(state, action) => {
            state.user = action.payload;
        }
    }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;