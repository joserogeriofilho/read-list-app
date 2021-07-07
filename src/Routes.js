import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ToRead from './components/ToRead'
import FindABook from './components/FindABook'
import Finished from './components/Finished'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper isPrivate={true} path='/' exact component={ToRead} />
        <RouteWrapper isPrivate={true} path='/find' component={FindABook} />
        <RouteWrapper isPrivate={true} path='/finished' component={Finished} />
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