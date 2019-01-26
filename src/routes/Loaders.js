import Loadable from 'react-loadable';
import React from 'react';
import { store } from '../index';
import { getDataFromApiAction } from '../store/Actions';

const LoadableView = function MyLoadable(opts) {
	return Loadable.Map(Object.assign({
		loading: () => null,
		delay: 200,
		timeout: 5000,
		render(loaded, props) {
			const Component = loaded.Component.default;
			return <Component {...props} />;
		},
	}, opts));
};

export const HomeLoader = LoadableView({
	loader: {
		Component: () => import('../routes/Home'),
		data: () => new Promise(resolve => store.dispatch(getDataFromApiAction('/', resolve))),
	},
});

export const AboutLoader = LoadableView({
	loader: {
		Component: () => import('../routes/About'),
		data: () => new Promise(resolve => store.dispatch(getDataFromApiAction('/about', resolve))),
	},
});

export const LoginLoader = LoadableView({
	loader: {
		Component: () => import('../components/Login'),
	},
});

export const AppLoader = LoadableView({
	loader: {
		Component: () => import('../components/AppBar'),
	},
});
