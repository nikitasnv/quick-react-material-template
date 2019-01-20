import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import { getDataFromApi } from './store/Actions';
import Card from './components/Card';
import Details from './components/Details';

class Home extends Component {
	state = {
		selectedCard: {},
		detailState: false,
	};

	componentWillMount() {
		if (typeof this.props.data === 'undefined') {
			this.props.getData();
		}
	}

	openDetails = (data) => {
		this.setState({ detailState: true, selectedCard: data });
	};

	closeDetails = () => {
		this.setState({ detailState: false });
	};

	render() {
		return (
			<React.Fragment>
				{this.props.data === undefined ? (
					<div style={{ textAlign: 'center' }}>
						<CircularProgress />
					</div>
				) : (
					<React.Fragment>
						<Fade in>
							<Grid style={{ justifyContent: 'center' }} container spacing={24}>
								{this.props.data.map(data => (
									<Grid key={data.id} item>
										<Card data={data} openDetails={this.openDetails} />
									</Grid>
								))}
							</Grid>
						</Fade>
						<Details
							closeDetails={this.closeDetails}
							detailState={this.state.detailState}
							data={this.state.selectedCard}
						/>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	data: state.app.views.home,
});

const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(getDataFromApi('home')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
