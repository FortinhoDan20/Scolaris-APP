import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";

// 📌 Récupérer tous les propriétaires (sans pagination, simple liste)
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

// 📌 Récupérer les propriétaires avec pagination, recherche, tri
export const fetchAll = createAsyncThunk(
  "owners/fetchAll",
  async (params, { rejectWithValue }) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortField = "createdAt",
      sortOrder = "asc",
    } = params || {};
    try {
      const response = await api.fetchAllOwners({
        page,
        limit,
        search,
        sortField,
        sortOrder,
      });
      console.log("responses:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// 📌 Récupérer les détails d’un propriétaire
export const getOwner = createAsyncThunk(
  "owners/details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getOwner(id);
      console.log("details info:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);
// === Ajoute cette action ===
export const updateOwner = createAsyncThunk(
  "owners/update",
  async ({ id, fromValue }, { rejectWithValue }) => {
    try {
      const response = await api.updateOwner(id, fromValue);
      console.log("update response:", response.data);
      return response.data;
    } catch (error) {
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
      // === getAllOwners ===
      .addCase(getAllOwners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload.owners || action.payload;
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
        state.totalPages = action.payload.totalPages || 0;
        state.totalOwners = action.payload.totalOwners || 0;
      })
      .addCase(getAllOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      })

      // === fetchAll ===
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload.owners || [];
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
        state.totalPages = action.payload.totalPages || 0;
        state.totalOwners = action.payload.totalOwners || 0;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      })

      // === getOwner ===
      .addCase(getOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload.owner || action.payload;
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      })
      // === updateOwner ===
      .addCase(updateOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload.owner || action.payload;

        // Met à jour la liste locale si besoin
        const index = state.owners.findIndex((o) => o._id === state.owner._id);
        if (index !== -1) {
          state.owners[index] = state.owner;
        }

        // ✅ Notification succès
        toast.success("Propriétaire mis à jour avec succès !");
      })
      .addCase(updateOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Whoops!";
        toast.error(state.error);
      });
  },
});

export const { setFilters } = ownerSlice.actions;
export default ownerSlice.reducer;
