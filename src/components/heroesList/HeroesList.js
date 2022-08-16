import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDeleting,
} from "../../actions";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { CSSTransition } from "react-transition-group";

function getContent(status, payload) {
  switch (status) {
    case "loading": {
      return <Spinner />;
    }
    case "idle": {
      return <ul>{payload}</ul>;
    }
    case "error": {
      return <h5 className="text-center mt-5">Error</h5>;
    }
    default: {
      return null;
    }
  }
}

const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  }, []);

  const handleDelete = (id) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => dispatch(heroesDeleting(id)))
      .catch(() => dispatch(heroesFetchingError()));
  };

  const renderHeroesList = useCallback(
    (arr) => {
      if (arr.length === 0) {
        return <h5 className="text-center mt-5">There are no heroes</h5>;
      }

      return arr.map(({ id, ...hero }) => {
        return (
          <div key={id}>
            <HeroesListItem hero={hero} handleDelete={() => handleDelete(id)} />
          </div>
        );
      });
    },
    [heroes]
  );

  const elements = renderHeroesList(heroes);
  const content = getContent(heroesLoadingStatus, elements);

  return (
    <>
      <CSSTransition
        in={heroesLoadingStatus === "idle"}
        timeout={400}
        classNames="heroes"
      >
        {content}
      </CSSTransition>
    </>
  );
};

export default HeroesList;
