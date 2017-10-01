import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import MarkdownPage from './components/MarkdownPage';

import routes, { homeRoute, redirectedRoutes, topRoutes } from './routes';

import './App.css';

class App extends Component {
  state = {
    pointerPosition: null,
  };

  // TODO: Update on touch events.
  // TODO: Update on keyboard navigation (such as change of focus).
  updatePointerPosition({ nativeEvent: { clientX, clientY } }) {
    this.setState({ pointerPosition: { x: clientX, y: clientY } });
  }

  render() {
    const { pointerPosition } = this.state;

    return (
      <Router>
        <div
          className="App"
          onMouseMove={event => this.updatePointerPosition(event)}
        >
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={() => (
                <Helmet>
                  <title>
                    {route.title ? `${route.title} | ` : ''}erbridge
                  </title>
                </Helmet>
              )}
            />
          ))}
          <Header pointerPosition={pointerPosition} routes={topRoutes} />
          <Body className="App__body" pointerPosition={pointerPosition}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  render={() => <MarkdownPage content={route.content} />}
                />
              ))}
              {redirectedRoutes.map((route, index) => (
                <Redirect key={`r${index}`} path={route.path} to={route.to} />
              ))}
              <Route render={() => <Redirect to={homeRoute.path} />} />
            </Switch>
          </Body>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
