import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";

export const getAllOwners = createAsyncThunk(
  "owners/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllOwners();
      console.log("data response :", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

export const fetchAll = createAsyncThunk(
  "fetch/all/owners",
  async (params, { rejectWithValue }) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortField = "createdAt",
      sortOrder = "desc",
    } = params || {};
    try {
  

      const response = await api.fetchAllOwners(params);
      console.log("responses:", response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: {},
    owners: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    totalOwners: 0,
    loading: false,
    error: null,
    filters: { search: "", sortBy: "createdAt", order: "asc", role: "" },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOwners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.totalOwners = action.payload.totalOwners;
      })
      .addCase(getAllOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Whoops!";
      })
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload.owners;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.totalOwners = action.payload.totalOwners;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Whoops!";
      });
  },
});
export const { setFilters } = ownerSlice.actions;
export default ownerSlice.reducer;
