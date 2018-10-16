import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import rootDomTag from '@site/root-dom-tag';

import App from './App';
import reducers from './reducers';
import service from './service';

// Create history object for tracking routes
const history = createBrowserHistory();

// Create middleware required for all builds
const middleware = [
  thunk.withExtraArgument(service),
  routerMiddleware(history),
];

// Function to start the rendering of the GUI
const startApp = () => {
  const composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
    || compose
  );

  const store = createStore(
    connectRouter(history)(reducers),
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  const Main = () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );

  ReactDOM.render(
    <Main />,
    document.getElementById(rootDomTag),
  );
};

// Check if the process is production mode and if it is not
// do not include redux logger into the build
if (process.env.NODE_ENV !== 'production') {
  import(/* webpackChunkName: "logger" */ 'redux-logger').then(module => {
    middleware.push(
      module.createLogger({
        collapsed: true,
      }),
    );
    startApp();
  });
} else {
  startApp();
}
