import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "./ToDoSlice"
export const store=configureStore({
    reducer:{
       todo:todoReducer
    }
})