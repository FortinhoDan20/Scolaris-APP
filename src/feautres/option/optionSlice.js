import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api";


// 📥 Récupérer toutes les options d'une école (par ID)
export const fetchOptionsBySchoolId = createAsyncThunk(
    'options/fetchBySchoolId',
    async (id, thunkAPI) => {
        try {
            const res = await api.getAllOptions(id);
            return res.data.options;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// 📥 Récupérer les options de l'école de l'utilisateur connecté
export const fetchMyOptions = createAsyncThunk(
    'options/fetchMine',
    async (token, thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/my-options`, authHeader(token));
            return res.data.options;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// 📥 Récupérer une seule option
export const fetchOptionById = createAsyncThunk(
    'options/fetchById',
    async ({ id, token }, thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/option/${id}`, authHeader(token));
            return res.data.option;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ➕ Créer une nouvelle option
export const createOption = createAsyncThunk(
    'options/create',
    async ({ data, schoolId, token }, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/school/${schoolId}/options`, data, authHeader(token));
            return res.data.option;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// 🔁 Mettre à jour une option
export const updateOption = createAsyncThunk(
    'options/update',
    async ({ id, data, token }, thunkAPI) => {
        try {
            const res = await axios.put(`${API_URL}/option/${id}`, data, authHeader(token));
            return res.data.option;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ❌ Supprimer une option
export const deleteOption = createAsyncThunk(
    'options/delete',
    async ({ id, token }, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/option/${id}`, authHeader(token));
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Slice initial
const optionSlice = createSlice({
    name: 'options',
    initialState: {
        options: [],
        currentOption: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetOptionState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            // 📥 Get All Options
            .addCase(fetchOptionsBySchoolId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOptionsBySchoolId.fulfilled, (state, action) => {
                state.loading = false;
                state.options = action.payload;
            })
            .addCase(fetchOptionsBySchoolId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📥 Get My Options
            .addCase(fetchMyOptions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyOptions.fulfilled, (state, action) => {
                state.loading = false;
                state.options = action.payload;
            })
            .addCase(fetchMyOptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📥 Get One Option
            .addCase(fetchOptionById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOptionById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOption = action.payload;
            })
            .addCase(fetchOptionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ➕ Create
            .addCase(createOption.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOption.fulfilled, (state, action) => {
                state.loading = false;
                state.options.push(action.payload);
                state.success = true;
            })
            .addCase(createOption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔁 Update
            .addCase(updateOption.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOption.fulfilled, (state, action) => {
                state.loading = false;
                state.options = state.options.map(opt => 
                    opt._id === action.payload._id ? action.payload : opt
                );
                state.success = true;
            })
            .addCase(updateOption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ❌ Delete
            .addCase(deleteOption.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOption.fulfilled, (state, action) => {
                state.loading = false;
                state.options = state.options.filter(opt => opt._id !== action.payload);
                state.success = true;
            })
            .addCase(deleteOption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOptionState } = optionSlice.actions;
export default optionSlice.reducer;
