import { configureStore } from "@reduxjs/toolkit";
import authRedeucer from '../feautres/auth/authSlice'
import ownerReducer from '../feautres/owner/ownerSlice'
import promoterReducer from "../feautres/promoter/promoterSlice"

export const store = configureStore({
    reducer: {
        auth: authRedeucer,
        owner: ownerReducer,
        promoter: promoterReducer
    }
})