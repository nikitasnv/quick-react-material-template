import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import { checkUserAction, authUserAction, updateError } from '../store/Actions';
import LoginPage from './Login';

const styles = theme => ({
	wrapper: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: grey[50],
	},
	loginContainer: {
		minWidth: 320,
		maxWidth: 400,
		height: 'auto',
	},
	paper: {
		padding: 20,
		overflow: 'auto',
	},
	loginBtn: {
		float: 'right',
		margin: theme.spacing.unit,
	},
	field: {
		marginTop: 10,
	},
	buttonProgress: {
		color: blue[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	errorSnack: {
		backgroundColor: theme.palette.error.dark,
		minWidth: 'auto',
	},
	errorMessage: {
		display: 'flex',
		alignItems: 'center',
	},
	errorIcon: {
		marginLeft: 5,
	},
});

class Auth extends React.Component {
	state = {
		loading: false,
		email: '',
		password: '',
		remember: false,
		showError: false,
	};

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

	hideAuthError = () => {
		this.setState({ showError: false });
	};

	render() {
		const {
			children, authState, classes, errorBar, setError,
		} = this.props;
		return (
			<React.Fragment>
				{authState === 0 && (
					<div className={classes.wrapper}>
						<CircularProgress color="primary" />
					</div>
				)}
				{authState === 1 && (
					<LoginPage
						runSubmit={this.handleSubmit}
						hideAuthError={this.hideAuthError}
						classes={classes}
						formState={this.state}
					/>
				)}
				{authState === 2 && React.Children.only(children)}
				<Snackbar
					ContentProps={{
						classes: {
							root: classes.errorSnack,
						},
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					autoHideDuration={6000}
					message={(
						<span className={classes.errorMessage}>
							{errorBar.message}<ErrorIcon className={classes.errorIcon} />
						</span>
					)}
					open={errorBar.show}
					onClose={() => setError(false)}
				/>
			</React.Fragment>
		);
	}
}

Auth.propTypes = {
	authState: PropTypes.number.isRequired,
	loginUser: PropTypes.func.isRequired,
	checkUser: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	errorBar: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
	authState: state.app.authState,
	errorBar: state.app.error,
});

const mapDispatchToProps = dispatch => ({
	loginUser: form => authUserAction(form, dispatch),
	checkUser: () => dispatch(checkUserAction()),
	setError: (show, message = '') => dispatch(updateError(show, message)),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
)(Auth);

