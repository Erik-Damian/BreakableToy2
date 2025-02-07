'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlightsApi } from '@/app/axios/flightsApi';
import { FlightOffer, FlightResponse } from '@/app/utils/FlghtSearchcTypes';

interface FlightState {
  results: FlightOffer[];
  params: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  results: [],
  params: {},
  loading: false,
  error: null,
};

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (params: any, { rejectWithValue }) => {
    try {
        const response = await fetchFlightsApi(params);
        console.log(response); 
        return {response, params};
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.results = action.payload.response;
        state.params = action.payload.params;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flightsSlice.reducer;
