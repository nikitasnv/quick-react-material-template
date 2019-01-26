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
	test: 0,
};
/*
let mainState = [];

const globalReducer = {
	ADD_TODO: (state, action) => [...state, {
		id: action.id,
		text: action.text,
		completed: false,
	}],
	TOGGLE_TODO: (state, action) => {
		const newState = [...state];
		const va = newState.find(val => action.id === val.id);
		va.completed = !va.completed;
		return newState;
	},
};

export const todo = (state = mainState, action) => {
	const func = globalReducer[action.type];
	return func ? func(state, action) : state;
};

mainState = todo(mainState, {
	type: 'ADD_TODO', id: 0, text: 'test', completed: false,
});

mainState = todo(mainState, {
	type: 'TOGGLE_TODO', id: 0,
}); */

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

/* const testReduce = (state = { omg: 0 }, action) => {
	if (action.type === 'TTT') return { ...state, omg: (state.omg || 0) + 10 };
	return state;
};

const reduceReducers = (...args) => {
	const initialState = typeof args[args.length - 1] !== 'function' && args.pop();
	const reducers = args;

	if (typeof initialState === 'undefined') {
		throw new TypeError(
			'The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined.',
		);
	}

	return (prevState, value, ...args) => {
		const prevStateIsUndefined = typeof prevState === 'undefined';
		const valueIsUndefined = typeof value === 'undefined';

		if (prevStateIsUndefined && valueIsUndefined && initialState) {
			return initialState;
		}

		return reducers.reduce((newState, reducer, index) => {
			if (typeof reducer === 'undefined') {
				throw new TypeError(
					`An undefined reducer was passed in at index ${index}`,
				);
			}
			const tst = reducer(newState, value, ...args);
			return tst;
		}, prevStateIsUndefined && !valueIsUndefined && initialState ? initialState : prevState);
	};
}; */

export default history => combineReducers({
	router: connectRouter(history),
	app: mainReducer,
	// ...testReduce,
});
