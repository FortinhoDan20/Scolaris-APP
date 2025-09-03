import { configureStore } from "@reduxjs/toolkit";
import authRedeucer from '../feautres/auth/authSlice'
import ownerReducer from '../feautres/owner/ownerSlice'

export const store = configureStore({
    reducer: {
        auth: authRedeucer,
        owner: ownerReducer
    }
})