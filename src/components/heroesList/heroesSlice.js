import { createSlice } from "@reduxjs/toolkit";

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroes: [],
    heroesLoadingStatus: "idle",
  },
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    },
    heroesFetchingError: (state, action) => {
      state.heroesLoadingStatus = "error";
    },
    heroesDeleting: (state, action) => {
      state.heroes = state.heroes.filter(({ id }) => id !== action.payload);
    },
    heroesCreating: (state, action) => {
      state.heroes.push(action.payload);
    },
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
