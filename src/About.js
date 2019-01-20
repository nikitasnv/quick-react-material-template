import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { getDataFromApi } from './store/Actions';

class About extends React.Component {
	componentWillMount() {
		if (typeof this.props.data === 'undefined') {
			this.props.getData();
		}
	}

	render() {
		const { data } = this.props;
		return (
			<React.Fragment>
				{data === undefined ? (
					<div style={{ textAlign: 'center' }}>
						<CircularProgress />
					</div>
				) : (
					<Fade in>
						<Paper style={{ padding: '15px' }}>
							<Typography style={{ textAlign: 'center', marginBottom: '15px' }} variant="h3">
								{data.title}
							</Typography>
							<Typography variant="h5">
								{data.body}
							</Typography>
						</Paper>
					</Fade>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	data: state.app.views.about,
});

const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(getDataFromApi('about')),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
