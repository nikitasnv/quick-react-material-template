import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './index.css';
import * as serviceWorker from './serviceWorker';
import AppBar from './components/AppBar';
import Home from './Home';
import About from './About';
import Auth from './components/Auth';
import configureStore from './store/Store';

const history = createBrowserHistory();
export const store = configureStore(history);

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
