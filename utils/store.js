import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import searchSlice from "./appSlice";
import chatSlice from "./chatSlice";



const store  = configureStore({
    reducer:{
        youtube:appReducer,
        search:searchSlice,
        chat:chatSlice,
      
       
    }
})

export default store;