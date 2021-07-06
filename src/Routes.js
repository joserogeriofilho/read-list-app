import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import WatchList from './components/WatchList'
import FindAMovie from './components/FindAMovie'
import Watched from './components/Watched'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper isPrivate={true} path='/' exact component={WatchList} />
        <RouteWrapper isPrivate={true} path='/find' component={FindAMovie} />
        <RouteWrapper isPrivate={true} path='/watched' component={Watched} />
        {/* <RouteWrapper isPrivate={false} path='/login' component={Login} />

        {/* Redirects a user to a valid path in case of 404 */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

function RouteWrapper({ component, isPrivate, ...rest }) {
  const isLogged = () => true;
  const logged = isLogged();

  if (isPrivate && !logged) {
    return <Redirect to="/login" />;
  }

  if (!isPrivate && logged) {
    return <Redirect to="/" />
  }

  return <Route {...rest} component={component} />;
}