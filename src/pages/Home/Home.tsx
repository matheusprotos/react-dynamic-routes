import { Button, InputLabel, TextareaAutosize, TextField } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteOptions, RoutesProvider } from '../../providers/Routes.provider';
import './Home.scss';

type FormData = {
  name: string;
  content: string;
};

const Home = () => {
  const routesProvider = RoutesProvider.Instance;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    routesProvider.getRoutes().subscribe(routes => setRoutes(routes));
  }, [routesProvider]);

  /**
   * Cria uma rota dinâmica
   * @param {FormData} data Dados do formulário para criação da rota
   */
  const createRoute = (data: FormData): void => {
    routesProvider.addRoute({
      path: `/${data.name}`,
      name: data.name,
      component: () => (
        <>
          <div className="Container" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </>
      )
    });
  };

  /**
   * Valida se todos os campos do formulário estão corretos
   * @param {FormData} data Dados do formulário para criação da rota
   * @returns {any} Erros do formulário
   */
  const validate = (data: FormData): any => {
    let errors: any = {};

    if (!data.name) errors.name = 'Required field';
    if (!data.content) errors.content = 'Required field';

    return errors;
  };

  return (
    <>
      <Formik initialValues={{ name: '', content: '' }} validate={validate} onSubmit={createRoute}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="input-div">
              <InputLabel htmlFor="route-name">Route Name</InputLabel>
              <TextField
                id="route-name"
                type="text"
                name="name"
                onChange={props.handleChange}
                value={props.values.name}
              />
              <ErrorMessage name="name">{(message: string) => <div className="error">{message}</div>}</ErrorMessage>
            </div>
            <div className="input-div">
              <InputLabel htmlFor="route-content">Route Content</InputLabel>
              <TextareaAutosize
                id="route-content"
                name="content"
                onChange={props.handleChange}
                value={props.values.content}
              />
              <ErrorMessage name="content">{(message: string) => <div className="error">{message}</div>}</ErrorMessage>
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Create Route
              </Button>
            </div>
          </form>
        )}
      </Formik>
      {routes.map((route: RouteOptions, index: number) => (
        <Link key={index} to={route.path}>
          <h1>{route.name}</h1>
        </Link>
      ))}
    </>
  );
};

export default Home;
