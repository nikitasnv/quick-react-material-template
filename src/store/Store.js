import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import {
	getDataFromApi as getDataApi, authCheck, authLogin as authLoginAction,
	SAGA_CHECK_USER, SAGA_AUTH_USER, SAGA_GET_DATA_FROM_API,
} from './Actions';
import rootSaga from './Sagas';
import appReducer from './Reducers';

const USE_SAGA = false;

export const getDataFromApi = view => (USE_SAGA
	? { type: SAGA_GET_DATA_FROM_API, view }
	: getDataApi(view));

export const checkUser = () => (USE_SAGA
	? { type: SAGA_CHECK_USER } 
	: authCheck());

export const authUser = (form, dispatch) => (USE_SAGA
	? new Promise(resolve => dispatch(
		{ type: SAGA_AUTH_USER, payload: form, meta: { resolve } },
	))
	: dispatch(authLoginAction(form)));

export default (history) => {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	let middleware;
	if (USE_SAGA) {
		middleware = createSagaMiddleware();
	} else {
		middleware = thunkMiddleware;
	}
	const store = createStore(appReducer(history), composeEnhancers(applyMiddleware(
		routerMiddleware(history), middleware,
	)));
	USE_SAGA && middleware.run(rootSaga);
	return store;
};
