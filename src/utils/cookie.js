import Cookies from 'js-cookie';
const selected_film_name = 'SELECTED-FILM';
const favorite_film_name = 'FAVORITE-FILMS';

export function getSelectedtFilmURL() {
	return Cookies.get(selected_film_name);
}
export function setSelectedtFilmURL(url) {
	Cookies.set(selected_film_name, url, { expires: 7 });
}


export function getFavoriteFilms() {
	let value = Cookies.get(favorite_film_name);
	if (value === undefined) {
		value = [];
	} else {
		value = JSON.parse(value);
	}
	return value;
}
export function setFavouriteFilm(url, add) {
	let favFilms = getFavoriteFilms();
	if (add) {
		favFilms.push(url);
	} else {
		const existingIndex = favFilms.findIndex(val => val === url);
		favFilms.splice(existingIndex, 1);
	}
	Cookies.set(favorite_film_name, JSON.stringify(favFilms), { expires: 7 });
}

