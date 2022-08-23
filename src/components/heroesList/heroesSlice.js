import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroes: [],
    heroesLoadingStatus: "idle",
  },
  reducers: {
    heroesDeleting: (state, action) => {
      state.heroes = state.heroes.filter(({ id }) => id !== action.payload);
    },
    heroesCreating: (state, action) => {
      state.heroes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = "idle";
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDeleting,
  heroesCreating,
} = actions;
