import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function MainContent({ film }) {
    const classes = useStyles();

    useEffect(() => {

    }, [film]);

    return (
        <>
            {film ? (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <h1>{film.title}</h1>
                    <Typography paragraph>{film.opening_crawl}</Typography>
                </main>
            ) : null}
        </>
    )
}

export default MainContent;