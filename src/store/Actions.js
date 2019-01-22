export const [AUTH_CHECK, AUTH_OUT, AUTH_IN] = [0, 1, 2];
export const [GET_DATA_FROM_API, AUTH_USER, CHECK_USER] = ['GET_DATA_FROM_API', 'AUTH_USER', 'CHECK_USER'];
export const [SAGA_CHECK_USER, SAGA_AUTH_USER, SAGA_GET_DATA_FROM_API] = ['SAGA_CHECK_USER', 'SAGA_AUTH_USER', 'SAGA_GET_DATA_FROM_API'];

export const cacheView = (json, view) => ({ type: GET_DATA_FROM_API, data: json, view });
export const authUser = (status, token) => ({ type: AUTH_USER, status, token });
export const setAuthState = status => ({ type: CHECK_USER, status });

export function getDataFromApi(view) {
	let url;
	switch (view) {
		default:
		case 'home':
			url = 'https://jsonplaceholder.typicode.com/photos?_limit=20';
			break;
		case 'about':
			url = 'https://jsonplaceholder.typicode.com/posts/2';
			break;
	}
	return (dispatch, getState) => {
		const token = getState().app.authToken;
		fetch(url)
			.then(response => response.json())
			.then(json => new Promise((resolve, reject) => { setTimeout(() => { token === '_TOKEN_' ? resolve(json) : reject(); }, 1000); }))
			.then(json => dispatch(cacheView(json, view)))
			.catch(() => {
				console.error('AuthToken expired');
				dispatch(setAuthState(AUTH_OUT));
			});
	};
}

export function authCheck() {
	return (dispatch, getState) => new Promise((resolve) => {
		const token = getState().app.authToken;
		setTimeout(() => {
			const body = JSON.stringify({ status: token === '_TOKEN_' });
			resolve(new Response(body));
		}, 500);
	})
		.then(response => response.json())
		.then(json => dispatch(setAuthState(json.status ? AUTH_IN : AUTH_OUT)));
}

export function authLogin(form) {
	return dispatch => new Promise((resolve) => {
		setTimeout(() => {
			let body = { status: false };
			if (form.email === 'test' && form.password === 'test') {
				body = { status: true, token: '_TOKEN_' };
			}
			resolve(new Response(JSON.stringify(body)));
		}, 500);
	})
		.then(response => response.json())
		.then((json) => {
			form.remember && localStorage.setItem('AUTH_TOKEN', json.token);
			dispatch(authUser(json.status ? AUTH_IN : AUTH_OUT, json.token));
			return json.status;
		});
}
