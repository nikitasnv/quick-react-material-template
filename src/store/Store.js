import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import appReducer from './Reducers';

export default (history) => {
	const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
		|| compose;
	const middleware = createSagaMiddleware();
	const store = createStore(appReducer(history), composeEnhancers(applyMiddleware(
		routerMiddleware(history), middleware,
	)));
	middleware.run(rootSaga);
	return store;
};
