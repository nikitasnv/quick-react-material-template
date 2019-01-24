import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Typography from '@material-ui/core/Typography/Typography';
import { Formik, Form, Field } from 'formik';
import Fade from '@material-ui/core/Fade/Fade';

export default ({
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
