// STYLING
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';

// import $ from 'jquery';
// import Popper from 'popper.js';

import * as serviceWorker from './serviceWorker';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// REDUX STUFF
import { Provider } from 'react-redux';
import { store, persistor } from './public/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// IMPORT COMPONENT
import NavBar from './public/components/NavBar';
import Footer from './public/components/Footer';

// IMPORT SCREEN
import LandingPage from './landingpage/'
import Home from './home/screens/index';
import Movie from './movie/screens/movie';
import Search from './movie/screens/search';
import Categories from './movie/screens/categories';
import Category from './movie/screens/category';
import Login from './auth/screens/login';
import Register from './auth/screens/register';

import NotFound from './public/screens/NotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div>
              <NavBar style={{ marginTop: 90 }} />
              <Switch>
                <Route exact path="/landing-page" component={LandingPage} />
                <Route exact path="/" component={Home} />
                <Route exact path="/movie/:id" render={(props) => <Movie {...props} />} />
                <Route exact path={`/movies`} component={Search} />
                <Route path="/categories" component={Categories} />
                <Route path="/category/:id" component={Category} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();