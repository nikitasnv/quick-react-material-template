import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
	GET_DATA_FROM_API,
	AUTH_USER,
	CHECK_USER,
	AUTH_CHECK,
	UPDATE_ERROR_BAR,
} from './Actions';

const defaultState = {
	views: {},
	authState: AUTH_CHECK,
	authToken: localStorage.getItem('AUTH_TOKEN'),
	error: { message: '', show: false },
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
		case UPDATE_ERROR_BAR:
			return {
				...state,
				error: {
					message: action.show
						? action.message
						: state.error.message,
					show: action.show, 
				},
			};
		default:
			return state;
	}
};

export default reducers => combineReducers({
	router: connectRouter(reducers),
	app: mainReducer,
});
