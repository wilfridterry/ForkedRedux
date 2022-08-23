import { filtersFetched } from "../components/heroesFilters/filtersSlice";


export const fetchFilters = (request) => (dispatch) => {
  request("http://localhost:3001/filters").then((data) =>
    dispatch(filtersFetched(data))
  );
};
