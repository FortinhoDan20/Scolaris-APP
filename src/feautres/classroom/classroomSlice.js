import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// 📥 Récupérer toutes les salle de classe d'une école (par ID)
export const fetchClassroomBySchoolId = createAsyncThunk(
  "classroom/fetchAllBySchool ",
  async ({ id, params }, thunkAPI) => {
    const { page = 1, limit = 10 } = params || {};
    try {
  const res = await api.getAllClassroom(id, { page, limit });
  console.log("response :", res)
      return res.data;
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
    page: 1,
    limit: 10,
    total: 0,
    totalPages:0
  },

  extraReducers: (builder) => {
    builder

      // 📥 Get All Options
      .addCase(fetchClassroomBySchoolId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassroomBySchoolId.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload.classrooms
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
        state.total = action.payload.total || 0;
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchClassroomBySchoolId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
  },
});


export default classroomSlice.reducer;
