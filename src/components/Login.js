import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Typography from '@material-ui/core/Typography/Typography';
import { Formik, Form, Field } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade/Fade';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

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
});

const Login = ({
	classes, runSubmit,
}) => (
	<div className={classes.wrapper}>
		<Fade in>
			<div className={classes.loginContainer}>
				<Paper className={classes.paper}>
					<Formik
						initialValues={{
							email: '', password: '', remember: false,
						}}
						onSubmit={runSubmit}
					>
						{({
							values, isSubmitting,
						}) => (
							<Form>
								<Field name="email">
									{({ field }) => (
										<TextField
											{...field}
											className={classes.field}
											label="E-mail"
											fullWidth
											required
										/>
									)}
								</Field>
								<Field name="password">
									{({ field }) => (
										<TextField
											{...field}
											className={classes.field}
											label="Password"
											type="password"
											fullWidth
											required
										/>
									)}
								</Field>

								<Field name="remember">
									{({ field }) => (
										<div>
											<FormControlLabel
												className={classes.field}
												control={(
													<Checkbox
														{...field}
														color="primary"
														checked={field.value}
														value="remember"
													/>
												)}
												label="Remember Me"
											/>
										</div>
									)}
								</Field>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									className={classes.loginBtn}
									disabled={isSubmitting || !values.email || !values.password}
								>
								Login
									{isSubmitting
								&& <CircularProgress size={24} className={classes.buttonProgress} />}
								</Button>
							</Form>
						)}
					</Formik>
				</Paper>
				<Typography style={{ textAlign: 'center', marginTop: 15 }}>Email/Password: <b>test</b></Typography>
			</div>
		</Fade>
	</div>
);

export default withStyles(styles)(Login);
