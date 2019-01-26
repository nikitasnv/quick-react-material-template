import {
	takeEvery, put, call, select,
} from 'redux-saga/effects';

import {
	GET_DATA_FROM_API, AUTH_USER, CHECK_USER,
	AUTH_OUT, AUTH_IN,
	SAGA_CHECK_USER, SAGA_AUTH_USER,
	SAGA_GET_DATA_FROM_API,
} from './Actions';

// const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

function* sendTestRequest(data) {
	try {
		// yield delay(500);
		const response = yield call(fetch, 'http://mockbin.com/request', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		const decoded = yield call([response, 'json']);
		return JSON.parse(decoded.postData.text);
	} catch (e) {
		console.error(e);
		return { status: false };
	}
}

export function* getDataFromApi(action) {
	try {
		// yield delay(500);
		const token = (yield select()).app.authToken;
		if (token !== '_TOKEN_') {
			console.error('AuthToken expired');
			yield put({ type: CHECK_USER, status: AUTH_OUT });
		}
		let url;
		switch (action.view) {
			case '/':
				url = 'https://jsonplaceholder.typicode.com/photos?_limit=20';
				break;
			case '/about':
				url = 'https://jsonplaceholder.typicode.com/posts/2';
				break;
			default:
				return;
		}
		const response = yield call(fetch, url);
		const decoded = yield call([response, 'json']);
		yield put({ type: GET_DATA_FROM_API, data: decoded, view: action.view });
		action.resolve && action.resolve();
	} catch (e) {
		console.error(e);
	}
}

export function* authCheck() {
	try {
		const token = (yield select()).app.authToken;
		const response = yield sendTestRequest({ status: token === '_TOKEN_' });
		yield put({ type: CHECK_USER, status: response.status ? AUTH_IN : AUTH_OUT });
	} catch (e) {
		console.error(e);
	}
}

export function* authLogin(task) {
	try {
		const status = task.payload.email === 'test' && task.payload.password === 'test';
		const body = { status };
		status && (body.token = '_TOKEN_');
		const response = yield sendTestRequest(body);
		task.payload.remember && localStorage.setItem('AUTH_TOKEN', response.token || null);
		yield put({
			type: AUTH_USER,
			status: response.status
				? AUTH_IN : AUTH_OUT,
			token: response.token || null,
		});
		yield task.meta.resolve(response.status);
	} catch (e) {
		console.error(e);
	}
}

/* function* updateView(task) {
	const viewPath = task.payload.location.pathname;
	const viewData = (yield select()).app.views[viewPath];
	if (typeof viewData === 'undefined') {
		yield call(getDataFromApi, { view: viewPath });
	}
} */

export default function* rootSaga() {
	yield takeEvery(SAGA_CHECK_USER, authCheck);
	yield takeEvery(SAGA_AUTH_USER, authLogin);
	yield takeEvery(SAGA_GET_DATA_FROM_API, getDataFromApi);
//	yield takeEvery(LOCATION_CHANGE, updateView);
}
