// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector } from "react-redux";

const HeroesFilters = () => {
  const { filters } = useSelector((state) => state);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <button className="btn btn-outline-dark active">all</button>
          {filters.map(({value, className}, index) => (
            <option key={index} value={value} className={`btn btn-${className}`}>
              {value}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
