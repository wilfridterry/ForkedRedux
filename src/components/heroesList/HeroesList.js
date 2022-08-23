import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { heroesDeleting, fetchHeroes } from "../heroesList/heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { CSSTransition } from "react-transition-group";
import { createSelector } from "@reduxjs/toolkit";

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
  const filteredHeroesSelector = createSelector(
    (state) => state.filtersReducer.currentFilter,
    (state) => state.heroesReducer.heroes,
    (currentFilter, heroes) => {
      return currentFilter === null
        ? heroes
        : heroes.filter((hero) => hero.element === currentFilter);
    }
  );

  const heroes = useSelector(filteredHeroesSelector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroesReducer.heroesLoadingStatus
  );

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  const handleDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => dispatch(heroesDeleting(id)))
      .catch(() => console.log("Error with deleting"));
  };

  const renderHeroesList = useCallback(
    (heroes) => {
      if (heroes.length === 0) {
        return <h5 className="text-center mt-5">There are no heroes</h5>;
      }

      return heroes.map(({ id, ...hero }) => {
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
