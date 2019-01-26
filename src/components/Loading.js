import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import grey from '@material-ui/core/colors/grey';

export const LoadingMask = () => (
	<div style={{
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: grey[50],
	}}
	>
		<CircularProgress color="primary" />
	</div>
);


