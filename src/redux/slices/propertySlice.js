import { createSlice  } from "@reduxjs/toolkit";
import axios from "axios";


const propertySlice = createSlice({
    name:'properties',
    initialState:{
        properties:[],
        propertyContainer:[],
        loading:false,
        error:'',
        propertyPerPage:4,
        currentPage:1
    },
    reducers:{
        searchProperty:(state,action)=>{
            state.properties=state.propertyContainer.filter(item=>item.place.toLowerCase().includes(action.payload))
        },
        onNavigatePrev:(state)=>{
            state.currentPage--
        },
        onNavigateNext:(state)=>{
            state.currentPage++
        },

    },
    
})
export const {searchProperty,onNavigateNext,onNavigatePrev}=propertySlice.actions
export default propertySlice.reducer