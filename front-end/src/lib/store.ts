'use client';

import { configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportsSlice';
import flightsReducer from './slices/flightsSlice';

export const store= () =>{ return configureStore({
    reducer: {
        airports: airportReducer,
        flights: flightsReducer,
    },
})};


export type AppStore = ReturnType<typeof store>

export type RootState = ReturnType<AppStore['getState']>

// Define the AppDispatch type
export type AppDispatch = AppStore['dispatch'];

export default store;