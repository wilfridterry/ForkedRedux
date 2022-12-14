import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useHttp } from "../../hooks/http.hook";
import { fetchFilters } from "../heroesFilters/filtersSlice";
import { heroesCreating } from "../heroesList/heroesSlice";

import { useEffect } from "react";
const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters } = useSelector(({ filtersReducer }) => filtersReducer);

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  const initialValues = {
    name: "",
    description: "",
    element: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().min(2).required(),
        description: Yup.string().min(10).required(),
        element: Yup.mixed()
          .oneOf(["fire", "water", "wind", "earth"])
          .required(),
      })}
      onSubmit={(values, { resetForm }) => {
        const data = { ...values, id: uuidv4() };

        request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
          .then(() => {
            dispatch(heroesCreating(data));
            resetForm({ values: initialValues });
          })
          .catch(() => console.log("Error"));
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Name of hero
          </label>

          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Input name?"
          />
          <ErrorMessage name="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Description
          </label>
          <Field
            required
            name="description"
            as="textarea"
            className="form-control"
            id="text"
            placeholder="What i can?"
            style={{ height: "130px" }}
          />
          <ErrorMessage name="description" />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Choose element
          </label>
          <Field
            required
            className="form-select"
            id="element"
            name="element"
            as="select"
          >
            <option>Element</option>
            {filters.map(({ value }, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <ErrorMessage name="element" />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
