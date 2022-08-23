import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
  const { request } = useHttp();

  return request("http://localhost:3001/filters");
});

const filters = createSlice({
  name: "filters",
  initialState: {
    filters: [],
    currentFilter: null,
  },
  reducers: {
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
    });
  }
});

const { reducer, actions } = filters;

export default reducer;

export const { filtersFetched, setCurrentFilter } = actions;
