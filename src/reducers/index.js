const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  heroesDeletingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING": {
      return {
        ...state,
        heroesLoadingStatus: "loading",
        heroesDeletingStatus: "idle",
      };
    }
    case "HEROES_FETCHED": {
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    }
    case "HEROES_FETCHING_ERROR": {
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    }
    case "HEROES_DELETING": {
      const heroes = state.heroes.filter(({ id }) => id !== action.payload);
      return {
        ...state,
        heroesLoadingStatus: "idle",
        heroes,
      };
    }
    case "HEROES_DELETING_ERROR": {
      return {
        ...state,
        heroesDeletingStatus: "error",
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
