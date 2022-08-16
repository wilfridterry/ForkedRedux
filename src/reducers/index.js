const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING": {
      return {
        ...state,
        heroesLoadingStatus: "loading",
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
        heroes,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
