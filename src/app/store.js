import { configureStore } from "@reduxjs/toolkit";
import authRedeucer from '../feautres/auth/authSlice'
import ownerReducer from '../feautres/owner/ownerSlice'
import promoterReducer from "../feautres/promoter/promoterSlice"
import schoolReducer from "../feautres/school/schoolSlice"
import cycleReducer from "../feautres/cycle/cycleSlice"
import optionReducer from "../feautres/option/optionSlice"
import classroomReducer from "../feautres/classroom/classroomSlice"

export const store = configureStore({
    reducer: {
        auth: authRedeucer,
        owner: ownerReducer,
        promoter: promoterReducer,
        school: schoolReducer,
        cycle: cycleReducer,
        option: optionReducer,
        classroom: classroomReducer
    }
})