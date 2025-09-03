import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api"


export const signIn = createAsyncThunk( "auth/login", async({ formValue, navigate, toast}, { rejectWithValaue }) => {
    console.log("data signin : ", formValue)
    const response = await api.loginOwner(formValue)
    console.log("response :" , response)
    if(response){
        toast.success(response.data.message || "Connexion réussie")
        navigate(`/`)
        return response.data
    } else {
        toast.error(response.error)
        return rejectWithValaue(error.message)
    } 
})

const authSlice = createSlice({
    name: "auth",
    initialState:{
        owner: null,
        loading: false,
        error: ""

    },
    reducers: {
        setOwner: (state, action) => {
            state.owner = action.payload
        },
        setLogout: (state) => {
            localStorage.clear()
            state.owner = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
                state.owner = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Whoops!"
            })
                                                                                        

    }

})

export const { setOwner, setLogout } = authSlice.actions
export default authSlice.reducer