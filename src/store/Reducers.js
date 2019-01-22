import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
	GET_DATA_FROM_API,
	AUTH_USER,
	CHECK_USER,
	AUTH_CHECK,
} from './Sagas';

const defaultState = {
	views: {},
	authState: AUTH_CHECK,
	authToken: localStorage.getItem('AUTH_TOKEN'),
};

const mainReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_DATA_FROM_API:
			return {
				...state,
				views: { ...state.views, [action.view]: action.data },
			};
		case AUTH_USER:
			return {
				...state,
				authState: action.status,
				authToken: action.token,
			};
		case CHECK_USER:
			return {
				...state,
				authState: action.status,
			};
		default:
			return state;
	}
};

export default reducers => combineReducers({
	router: connectRouter(reducers),
	app: mainReducer,
});
