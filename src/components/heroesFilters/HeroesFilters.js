import { useDispatch, useSelector } from "react-redux";
import { setCurrentFilter } from "../../actions";
import classNames from "classnames";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { currentFilter, filters } = useSelector((state) => state);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by an element</p>
        <div className="btn-group">
          <button
            className={classNames("btn", "btn-outline-dark", {
              active: currentFilter === null,
            })}
            onClick={() => dispatch(setCurrentFilter(null))}
          >
            all
          </button>
          {filters.map(({ value, className }, index) => (
            <option
              key={index}
              value={value}
              className={classNames("btn", `btn-outline-${className}`, {
                active: currentFilter === value,
              })}
              onClick={() => {
                dispatch(setCurrentFilter(value));
              }}
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
