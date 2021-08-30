import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from "axios";
import { getSelectedtFilmURL, setSelectedtFilmURL } from '../../utils/cookie'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
}));

function Sidebar(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [filmsList, setFilmsList] = useState([]);
	const selectedFilmURL = getSelectedtFilmURL();

	async function requestFilms() {
		await axios.get(`https://swapi.dev/api/films/`).then(films => {
			const filmsList = films.data.results
			setFilmsList(filmsList);

			if (selectedFilmURL !== undefined) {
				filmsList.map((film, index) => {
					if (film.url === selectedFilmURL) {
						props.setChosenFilm(film);
					}
				});
			}
		})
	};

	const handleClick = (film) => {
		props.setChosenFilm(film);
		setSelectedtFilmURL(film.url);
		props.setMobileOpen(false);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{filmsList.map((film, index) => (
					<ListItem button key={index + 1} onClick={() => handleClick(film)}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={film.title} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	useEffect(() => {
		requestFilms();
	}, []);

	return (
		<nav className={classes.drawer} aria-label="mailbox folders">
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<Drawer
					container={container}
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={props.mobileOpen}
					onClose={props.handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
}

Sidebar.propTypes = {
	window: PropTypes.func,
};

export default Sidebar;