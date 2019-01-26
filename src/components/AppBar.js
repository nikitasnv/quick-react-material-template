import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Logout from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import {
	Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { compose } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { HomeLoader, AboutLoader } from '../routes/Loaders';
import { AUTH_OUT, CHECK_USER } from '../store/Actions';
import { history } from '../index';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
		height: '100%',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarContainer: {
		paddingRight: 0,
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.down('sm')]: {
			width: 0,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	contentContainer: {
		flexGrow: 1,
		overflow: 'auto',
		padding: theme.spacing.unit * 3,
		[theme.breakpoints.down('sm')]: {
			overflow: 'inherit',
		},
	},
});

class MiniDrawer extends React.Component {
	state = {
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	logoutApp = () => {
		localStorage.removeItem('AUTH_TOKEN');
		this.props.logout();
	};

	render() {
		const { classes, theme, views } = this.props;

		return (
			<ConnectedRouter history={history}>
				<div className={classes.root}>
					<CssBaseline />
					<AppBar
						position="fixed"
						className={classNames(classes.appBar, {
							[classes.appBarShift]: this.state.open,
						})}
					>
						<Toolbar className={classes.appBarContainer} disableGutters={!this.state.open}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, {
									[classes.hide]: this.state.open,
								})}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap>Title</Typography>
							<div style={{ flexGrow: 1 }} />
							<IconButton onClick={this.logoutApp} color="inherit" style={{ marginRight: 15 }}><Logout /></IconButton>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						className={classNames(classes.drawer, {
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open,
						})}
						classes={{
							paper: classNames({
								[classes.drawerOpen]: this.state.open,
								[classes.drawerClose]: !this.state.open,
							}),
						}}
						open={this.state.open}
					>
						<div className={classes.toolbar}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />
						<List>
							<ListItem selected={this.props.pathname === '/'} button component={Link} to="/">
								<ListItemIcon><HomeIcon /></ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>
							<ListItem selected={this.props.pathname === '/about'} button component={Link} to="/about">
								<ListItemIcon><InboxIcon /></ListItemIcon>
								<ListItemText primary="About" />
							</ListItem>
						</List>
					</Drawer>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<div className={classes.contentContainer}>
							<Switch>
								<Route exact path="/" render={() => <HomeLoader data={views['/']} />} />
								<Route exact path="/about" render={() => <AboutLoader data={views['/about']} />} />
								<Redirect to="/" />
							</Switch>
						</div>
					</main>
				</div>
			</ConnectedRouter>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	theme: PropTypes.instanceOf(Object).isRequired,
	pathname: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	pathname: state.router.location.pathname,
	views: state.app.views,
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch({ type: CHECK_USER, status: AUTH_OUT }),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(MiniDrawer);
