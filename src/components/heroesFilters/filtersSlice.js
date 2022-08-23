import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
    name: "filters",
    initialState: {
      filters: [],
      currentFilter: null,
    },
    "reducers": {
        filtersFetched: (state, action) => {
            state.filters = action.payload;
        },
        setCurrentFilter: (state, action) => {
            state.currentFilter = action.payload;
        }
    },
});

const {reducer, actions} = filters;

export default reducer;

export const {
    filtersFetched,
    setCurrentFilter
} = actions;
