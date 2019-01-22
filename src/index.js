import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import * as serviceWorker from './serviceWorker';
import AppBar from './components/AppBar';
import Home from './Home';
import About from './About';
import appReducer from './store/Reducers';
import Auth from './components/Auth';
import RootSaga from  './store/Sagas';

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(appReducer(history), composeEnhancers(applyMiddleware(
	routerMiddleware(history), sagaMiddleware,
)));

sagaMiddleware.run(RootSaga);

ReactDOM.render(
	<Provider store={store}>
		<Auth>
			<ConnectedRouter history={history}>
				<AppBar>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Redirect to="/" />
					</Switch>
				</AppBar>
			</ConnectedRouter>
		</Auth>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
