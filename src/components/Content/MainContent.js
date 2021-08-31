import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import { getFavoriteFilms, setFavouriteFilm } from '../../utils/cookie'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function MainContent({ film }) {
    const classes = useStyles();
    const [fav, setFav] = useState(false);

    const title = {
        display: "inline"
    }
    const handleClick = (film_url) => {
        setFav(!fav);
        setFavouriteFilm(film_url, !fav);
    }

    useEffect(() => {
        setFav(false);
        if (film !== null) {
            const favoriteFilms = getFavoriteFilms();
            favoriteFilms.map(obj => {
                if (obj === film.url) {
                    setFav(true);
                }
            })
        }
    }, [film]);

    return (
        <>
            {film ? (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <h1 style={title}>{film.title}</h1>

                    <IconButton onClick={() => handleClick(film.url)} aria-label="delete" color="primary">
                        {fav ?
                            <Favorite />
                            :
                            <FavoriteBorderIcon />
                        }
                    </IconButton>
                    <Typography paragraph>{film.opening_crawl}</Typography>
                </main>
            ) : null}
        </>
    )
}

export default MainContent;