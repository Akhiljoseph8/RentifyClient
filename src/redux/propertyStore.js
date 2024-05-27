import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice";

const propertyStore=configureStore({
    reducer:{
        propertyReducer
    }
})

export default propertyStore