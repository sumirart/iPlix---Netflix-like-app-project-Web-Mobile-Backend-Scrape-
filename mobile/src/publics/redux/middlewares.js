import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware'

const middlewares = [];
// middleware react navigation
const reactNavigation = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
);
middlewares.push(reactNavigation);

// middlewares logger
const logger = createLogger();
middlewares.push(logger);

// middleware promise
middlewares.push(promiseMiddleware());

export default middlewares;