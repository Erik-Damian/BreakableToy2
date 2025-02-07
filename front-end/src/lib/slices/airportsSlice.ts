'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAirports } from '../../app/axios/airportsApi';
import { DropdownItem } from '../../app/utils/DropDownItemType';

// Define the state type
interface AirportState {
    results: DropdownItem[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: AirportState = {
    results: [],
    loading: false,
    error: null,
};

// Async thunk for fetching airports
export const fetchAirports = createAsyncThunk(
    'airports/fetchAirports',
    async (keyword: string, { rejectWithValue }) => {
        try {
            const response = await searchAirports(keyword);
            return response;
            
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const airportSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAirports.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload || [];
            })
            .addCase(fetchAirports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default airportSlice.reducer;