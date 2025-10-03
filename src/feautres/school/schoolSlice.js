import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify"; // ⚠️ tu avais un toast mais pas importé

// === fetchAllSchool ===
export const fetchAllSchool = createAsyncThunk(
  "school/fetchAll",
  async (params, { rejectWithValue }) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      promoterName = "",
      sortOrder = "asc", // ✅ ajouté
    } = params || {};
    try {
      const response = await api.getAllSchool({
        page,
        limit,
        search,
        sort,
        promoterName,
        sortOrder, // ✅ ajouté
      });
      console.log("responses:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// === getPromoter ===
export const getSchool = createAsyncThunk(
  "school/details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSchool(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    school: {},
    schools: [],
    promoter: null,

    // === pagination & meta ===
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    totalSchools: 0,

    // === filtres ===
    search: "",
    promoterName: "",
    sort: "createdAt",
    sortOrder: "asc",

    loading: false,
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPromoterName: (state, action) => {
      state.promoterName = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload.value || action.payload;
      state.page = 1;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.promoterName = "";
      state.sort = "createdAt";
      state.sortOrder = "asc";
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // === fetchAllSchool ===
      .addCase(fetchAllSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload.schools || [];
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
        state.totalPages = action.payload.totalPages || 0;
        state.totalSchools = action.payload.totalSchools || 0;
      })
      .addCase(fetchAllSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      })

      // === getPromoter ===
      .addCase(getSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload
      })
      .addCase(getSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      });
  },
});

export const {
  setSearch,
  setPromoterName,
  setSort,
  setSortOrder,
  setPage,
  resetFilters,
} = schoolSlice.actions;

export default schoolSlice.reducer;
