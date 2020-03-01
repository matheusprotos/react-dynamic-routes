import { Button, InputLabel, TextField, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  const { control, handleSubmit } = useForm<FormData>();

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

  return (
    <>
      <form onSubmit={handleSubmit(createRoute)}>
        <div className="input-div">
          <InputLabel htmlFor="route-name">Route Name</InputLabel>
          <Controller as={<TextField id="route-name" />} name="name" control={control} defaultValue="" required />
        </div>
        <div className="input-div">
          <InputLabel htmlFor="route-content">Route Content</InputLabel>
          <Controller
            as={<TextareaAutosize id="route-content" />}
            name="content"
            control={control}
            defaultValue=""
            required
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Create Route
          </Button>
        </div>
      </form>
      {routes.map((route: RouteOptions, index: number) => (
        <Link key={index} to={route.path}>
          <h1>{route.name}</h1>
        </Link>
      ))}
    </>
  );
};

export default Home;
