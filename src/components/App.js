import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkUserAction, authUserAction, updateError } from '../store/Actions';
import { LoadingMask } from './Loading';
import ErrorBar from './Error';
import { LoginLoader, AppLoader } from '../routes/Loaders';

class App extends React.Component {
	componentWillMount() {
		this.props.checkUser();
	}

	handleSubmit = (values, { setSubmitting }) => {
		this.props.loginUser(values).then((status) => {
			setSubmitting(false);
			if (!status) {
				this.props.setError(true, 'Wrong email or password');
			}
		});
	};

	render() {
		const {
			authState, errorState, setError,
		} = this.props;
		return (
			<React.Fragment>
				{authState === 0 && (
					<LoadingMask />
				)}
				{authState === 1 && (
					<LoginLoader
						runSubmit={this.handleSubmit}
						hideAuthError={this.hideAuthError}
						formState={this.state}
					/>
				)}
				{authState === 2 && (
					<AppLoader />
				)}
				<ErrorBar errorState={errorState} setError={setError} />
			</React.Fragment>
		);
	}
}

App.propTypes = {
	authState: PropTypes.number.isRequired,
	loginUser: PropTypes.func.isRequired,
	checkUser: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	authState: state.app.authState,
	errorState: state.app.error,
});

const mapDispatchToProps = dispatch => ({
	loginUser: form => authUserAction(form, dispatch),
	checkUser: () => dispatch(checkUserAction()),
	setError: (show, message = '') => dispatch(updateError(show, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

