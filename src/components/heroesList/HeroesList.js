import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDeleting,
  heroesDeletingError,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, heroesDeletingStatus } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    handleGetAll();
    // eslint-disable-next-line
  }, []);

  const handleGetAll = () => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  };

  const handleDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => dispatch(heroesDeleting(id)))
      .catch(() => dispatch(heroesDeletingError()));
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...hero }) => {
      return (
        <div>
          <HeroesListItem
            key={id}
            hero={hero}
            handleDelete={() => handleDelete(id)}
          />
        </div>
      );
    });
  };

  const elements = renderHeroesList(heroes);

  return (
    <ul className="heroes-list">
      {heroesDeletingStatus === "error" ? (
        <div className="error">There is a problem with deleting</div>
      ) : null}
      {elements}
    </ul>
  );
};

export default HeroesList;
