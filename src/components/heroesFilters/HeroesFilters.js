// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentFilter } from "../../actions";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { currentFilter, filters } = useSelector((state) => state);



  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by an element</p>
        <div className="btn-group">
          <button
            className={`btn btn-outline-dark ${currentFilter === null ? "active" : null}`}
            onClick={() => dispatch(setCurrentFilter(null))}
          >
            all
          </button>
          {filters.map(({ value, className }, index) => (
            <option
              key={index}
              value={value}
              className={`btn btn-${className} ${
                currentFilter === value ? "active" : null
              }`}
              onClick={() => { dispatch(setCurrentFilter(value))}}
            >
              {value}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
