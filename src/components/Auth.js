import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { withRouter } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography/Typography';
import Fade from '@material-ui/core/Fade/Fade';
import { authLogin, authCheck } from '../store/Actions';

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
		email: null,
		password: null,
		remember: false,
		showError: false,
	};

	componentWillMount() {
		this.props.checkUser();
	}

	fieldChange = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.checked || e.target.value || false;
		this.setState({
			[fieldName]: fieldValue,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const form = {
			email: this.state.email,
			password: this.state.password,
			remember: this.state.remember,
		};
		this.props.loginUser(form).then((status) => {
			this.setState({ loading: false, showError: !status });
		});
	};

	render() {
		const { children, authState, classes } = this.props;
		return (
			<React.Fragment>
				{authState === 0 && (
					<div className={classes.wrapper}>
						<CircularProgress color="primary" />
					</div>
				)}
				{authState === 1 && (
					<Fade in>
						<div className={classes.wrapper}>
							<div className={classes.loginContainer}>
								<Paper className={classes.paper}>
									<form onSubmit={this.handleSubmit}>
										<TextField
											className={classes.field}
											label="E-mail"
											name="email"
											fullWidth
											required
											onChange={this.fieldChange}
										/>
										<TextField
											className={classes.field}
											label="Password"
											name="password"
											type="password"
											fullWidth
											required
											onChange={this.fieldChange}
										/>

										<div>
											<FormControlLabel
												className={classes.field}
												control={(
													<Checkbox
														name="remember"
														color="primary"
														onChange={this.fieldChange}
													/>
												)}
												label="Remember Me"
											/>
										</div>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											className={classes.loginBtn}
											disabled={this.state.loading || !this.state.email || !this.state.password}
										>
										Login
											{this.state.loading
										&& <CircularProgress size={24} className={classes.buttonProgress} />}
										</Button>
									</form>
								</Paper>
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
									Wrong login or password<ErrorIcon className={classes.errorIcon} />
										</span>
									)}
									open={this.state.showError}
									onClose={() => this.setState({ showError: false })}
								/>
								<Typography style={{ textAlign: 'center', marginTop: 15 }}>Email/Password: <b>test</b></Typography>
							</div>
						</div>
					</Fade>
				)}
				{authState === 2 && React.Children.only(children)}
			</React.Fragment>
		);
	}
}

Auth.propTypes = {
	authState: PropTypes.number.isRequired,
	loginUser: PropTypes.func.isRequired,
	checkUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	authState: state.app.authState,
});

const mapDispatchToProps = dispatch => ({
	loginUser: form => dispatch(authLogin(form)),
	checkUser: () => dispatch(authCheck()),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	withStyles(styles),
)(Auth);

