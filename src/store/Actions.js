export const [AUTH_CHECK, AUTH_OUT, AUTH_IN] = [0, 1, 2];
export const [GET_DATA_FROM_API, AUTH_USER, CHECK_USER] = ['GET_DATA_FROM_API', 'AUTH_USER', 'CHECK_USER'];
export const [SAGA_CHECK_USER, SAGA_AUTH_USER, SAGA_GET_DATA_FROM_API] = ['SAGA_CHECK_USER', 'SAGA_AUTH_USER', 'SAGA_GET_DATA_FROM_API'];
export const UPDATE_ERROR_BAR = 'UPDATE_ERROR_BAR';

export const updateError = (show, message) => ({ type: UPDATE_ERROR_BAR, show, message });
export const getDataFromApiAction = (view, resolve = undefined) => ({ type: SAGA_GET_DATA_FROM_API, view, resolve });
export const checkUserAction = () => ({ type: SAGA_CHECK_USER });
export const authUserAction = (form, dispatch) => new Promise(resolve => dispatch(
	{ type: SAGA_AUTH_USER, payload: form, meta: { resolve } },
));

