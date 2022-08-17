export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroesDeleting = (id) => {
  return {
    type: "HEROES_DELETING",
    payload: id
  }
}

export const heroesCreating = (data) => {
  return {
    type: "HEROES_CREATING",
    payload: data
  }
}

export const filtersFetched = (data) => {
  return {
    type: "FILTERS_FETCHED",
    payload: data
  }
}

export const setCurrentFilter = (filter) => {
  return {
    type: "SET_CURRENT_FILTER",
    payload: filter
  }
}