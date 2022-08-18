const initialState = {
  filters: [],
  currentFilter: null,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHED": {
      return {
        ...state,
        filters: [...action.payload],
      };
    }
    case "SET_CURRENT_FILTER": {
      return {
        ...state,
        currentFilter: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default filtersReducer;
