import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		width: 245,
	},
	media: {
		height: 160,
	},
};

class MediaCard extends React.Component {
	setDetails = () => {
		const { data } = this.props;
		this.props.openDetails(data);
	}

	render() {
		const { classes, data } = this.props;
		return (
			<Card className={classes.card}>
				<CardActionArea onClick={this.setDetails}>
					<CardMedia
						className={classes.media}
						image={data.thumbnailUrl}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Card №{data.id}
						</Typography>
						<Typography component="p" noWrap>
							{data.title}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
}

MediaCard.propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	data: PropTypes.instanceOf(Object).isRequired,
	openDetails: PropTypes.func.isRequired,
};

export default withStyles(styles)(MediaCard);

