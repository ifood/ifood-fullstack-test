import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import ItalianMode from '../../components/ItalianMode';
import OrderService from '../../services/OrderService';
import bgVideo from '../../assets/videos/videoplayback.mp4';
import bgAudio from '../../assets/mp3/italian.mp3';
import pizza from '../../assets/videos/pizza_loop.mp4';
import { CONSTANTS } from '../../services/Util';

const useStyles = makeStyles(() => ({
	flexible: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	video: {
		position: 'fixed',
		minWidth: '100%',
		minHeight: '100%',
	},
	container: {
		overflow: 'auto',
		position: 'fixed',
		top: 0,
		backgroundImage: 'repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)',
		backgroundSize: '3px 3px',
		width: '100%',
		height: '100vh',
	},
	whiteBox: {
		boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
		backgroundColor: 'white',
		borderRadius: 4,
		padding: '2em 1em',
	},
	italian: {
		boxShadow: '5px -5px 0 rgb(0, 146, 70), 10px -10px 0 white, 15px -15px 0 rgb(206, 43, 55);',
	},
}));

const Home = ({ search, theme }) => {
	const italianMode = theme === CONSTANTS.italian;
	const classes = useStyles();
	const mainClasses = [classes.whiteBox];
	if (italianMode) {
		mainClasses.push(classes.italian);
	}

	useEffect(() => {
		const getInitialData = async () => {
			await search();
		};
		getInitialData();
	}, []);
	return (
		<>
			{ !italianMode
				&& (
					<video className={classes.video} autoPlay muted loop>
						<source src={bgVideo} type="video/mp4" />
					</video>
				)
			}
			{
				italianMode
				&& (
					<>
						<video className={classes.video} autoPlay muted loop>
							<source src={pizza} type="video/mp4" />
						</video>
						<audio autoPlay loop>
							<source src={bgAudio} />
						</audio>
					</>
				)
			}
			<div className={classes.container}>
				<Container>
					<div className={classes.flexible}>
						<Header italianMode={italianMode} />
						<ItalianMode />
					</div>
					<div className={mainClasses.join(' ')}>
						<Filter />
						<Grid />
					</div>
				</Container>
			</div>
		</>
	);
};

Home.propTypes = {
    search: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	search: () => dispatch(OrderService.search()),
});

const mapStateToProps = (state) => ({
	theme: state.themeReducer.theme,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
