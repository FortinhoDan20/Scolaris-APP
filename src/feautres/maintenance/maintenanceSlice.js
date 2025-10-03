import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const testConnect = createAsyncThunk(
  "options/fetchById",
  async (_, thunkAPI) => {
    try {
      const res = await api.tesConnection();
      return res.data.options;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Slice initial
const classroomSlice = createSlice({
  name: "options",
  initialState: {
    classrooms: [],
    currentClassroom: null,
    loading: false,
    error: null,
    success: false,
  },

  extraReducers: (builder) => {
    builder

      // 📥 Get All Options
      .addCase(testConnect.pending, (state) => {
        state.loading = true;
      })
      .addCase(testConnect.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(testConnect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classroomSlice.reducer;
