import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";



export const getAllCycles = createAsyncThunk(
  "cycle/all",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getAllCycle(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);



const cycleSlice = createSlice({
  name: "cycle",
  initialState: {
    cycle: {},
    cycles: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      // === fetchAll ===
      .addCase(getAllCycles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCycles.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = action.payload.cycles || [];
      })
      .addCase(getAllCycles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
       
      })

  },
});
export default cycleSlice.reducer;