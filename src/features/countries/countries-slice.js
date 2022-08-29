import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadCountries = createAsyncThunk(
    '@@countries/load-countries',
    (_, {
        extra: {api, client}
    }) => {
        return client.get(api.ALL_COUNTRIES)
    }
)

const initialState = {
    status: 'idle',
    error: null,
    list: [],
}

const countrySlice = createSlice({
    name: '@@countries',
    initialState,
    reducer: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCountries.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadCountries.rejected, (state, actioin) => {
            state.status = 'rejected';
            state.error = actioin.payload || actioin.meta.error;
        })
        .addCase(loadCountries.fulfilled, (state, actioin) => {
            state.status = 'received';
            state.list = actioin.payload.data;
        })
    },
})

export const countryReducer = countrySlice.reducer;

export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length,    
});

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, {search = '', region = ''}) => {
    return state.countries.list.filter(
        country => (
            country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
        )
    )
}