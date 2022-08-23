import { filtersFetched } from "../components/heroesFilters/filtersSlice";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  request("http://localhost:3001/filters").then((data) =>
    dispatch(filtersFetched(data))
  );
};

// export const heroesFetching = () => {
//   return {
//     type: "HEROES_FETCHING",
//   };
// };

// export const heroesFetched = (heroes) => {
//   return {
//     type: "HEROES_FETCHED",
//     payload: heroes,
//   };
// };

// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };

// export const heroesDeleting = (id) => {
//   return {
//     type: "HEROES_DELETING",
//     payload: id,
//   };
// };

// export const heroesCreating = (data) => {
//   return {
//     type: "HEROES_CREATING",
//     payload: data,
//   };
// };
