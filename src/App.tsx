import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { RoutesProvider, RouteOptions } from './providers/Routes.provider';
import Page404 from './pages/Page404/Page404';

const App = () => {
  const routesProvider = RoutesProvider.Instance;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    routesProvider.getRoutes().subscribe(routes => setRoutes(routes));
  }, [routesProvider]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {routes.map((route: RouteOptions, index: number) => (
          <Route key={index} path={route.path} component={route.component} />
        ))}
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
