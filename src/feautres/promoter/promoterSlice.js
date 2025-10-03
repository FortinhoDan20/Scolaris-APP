import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";
import { CloudCog } from "lucide-react";

// Ajouter un promoteur
export const addPromoter = createAsyncThunk(
  "promoter/addPromoter",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.newPromoter(formData);
      if (response.data) {
       // toast.success(response.data.message || "Promoteur ajouté avec succès !");
        return response.data;
      }
      return rejectWithValue("Erreur lors de l'ajout du promoteur");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllPromoters = createAsyncThunk(
  "promoter/fetchAll",
  async (params, { rejectWithValue }) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortField = "createdAt",
      sortOrder = "asc",
      gender
    } = params || {};
    console.log("params promoter :", params)
    try {
      const response = await api.fetchAllPromoters({
        page,
        limit,
        search,
        sortField,
        sortOrder,
        gender
      });
      console.log("responses:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

export const getPromoter = createAsyncThunk(
  "promoter/details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPromoter(id);
      console.log("details info:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);
// === Ajoute cette action ===

export const promoterUpdated = createAsyncThunk(
  "upadteed/promoter",
  async ({ id, formData }, { rejectWithValaue }) => {
    const response = await api.promoterOwner(formData, id);


    if (response) {
      // toast.success(response.data.message )
      return response.data;
    } else {
      toast.error(response.error);
      return rejectWithValaue(error.message);
    }
  }
);

const promoterSlice = createSlice({
  name: "promoter",
  initialState: {
    promoter: {},
    promoters: [],
    schools:[],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    totalPromoters: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
      builder      
        // === fetchAll ===
        .addCase(fetchAllPromoters.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllPromoters.fulfilled, (state, action) => {
          state.loading = false;
          state.promoters = action.payload.promoters || [];
          state.page = action.payload.page || 1;
          state.limit = action.payload.limit || 10;
          state.totalPages = action.payload.totalPages || 0;
          state.totalPromoters = action.payload.totalPromoters || 0;
        })
        .addCase(fetchAllPromoters.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message || "Whoops!";
          toast.error(state.error);
        })
   // === getPromoter ===
        .addCase(getPromoter.pending, (state) => {
          state.loading = true;
        })
        .addCase(getPromoter.fulfilled, (state, action) => {
          state.loading = false;
          state.promoter = action.payload.promoter
          state.schools = action.payload.schools

        })
        .addCase(getPromoter.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message || "Whoops!";
          toast.error(state.error);
        })
        // === updateOwner ===
        .addCase(promoterUpdated.pending, (state) => {
          state.loading = true;
        })
        .addCase(promoterUpdated.fulfilled, (state, action) => {
          state.loading = false;
          state.promoter = action.payload.promoter || action.payload;
  
          // Met à jour la liste locale si besoin
          const index = state.owners.findIndex((o) => o._id === state.owner._id);
          if (index !== -1) {
            state.owners[index] = state.owner;
          }
  
          // ✅ Notification succès
          toast.success("Propriétaire mis à jour avec succès !");
        })
        .addCase(promoterUpdated.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message || "Whoops!";
          toast.error(state.error);
        })
             // --- addPromoter ---
      .addCase(addPromoter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPromoter.fulfilled, (state, action) => {
        state.loading = false;
        state.promoter = action.payload.promoter || action.payload;
        state.promoters.unshift(state.promoter); // Ajouter au début de la liste
      })
      .addCase(addPromoter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(state.error);
      })
      
    },
});

export default promoterSlice.reducer