import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
    '@@details/load-country-by-name',
    (name, {extra: {client, api}}) => {
        return client.get(api.searchByCountry(name));
    }
)

export const loadNeighborsByBorders = createAsyncThunk(
    '@@details/load-neighbors-by-borders',
    (borders, {extra: {client, api}}) => {
        return client.get(api.filterByCode(borders));
    }
)

const initialState = {
    status: 'idle',
    error: null,
    currentCountry: null,
    neighbors: [],
}

const detailSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCountryByName.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadCountryByName.rejected, (state, actioin) => {
            state.status = 'rejected';
            state.error = actioin.payload || actioin.meta.error;
        })
        .addCase(loadCountryByName.fulfilled, (state, actioin) => {
            state.status = 'received';
            state.currentCountry = actioin.payload.data[0];
        })
        .addCase(loadNeighborsByBorders.fulfilled, (state, actioin) => {
            state.neighbors = actioin.payload.data.map(country => country.name)
        })
    }
});

export const { clearDetails } = detailSlice.actions;
export const detailsReducer = detailSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeigbors = (state) => state.details.neighbors;