import Cookies from 'js-cookie';
const cookie_name = 'SELECTED-FILM';

export function getSelectedtFilmURL() {
	return Cookies.get(cookie_name);
}

export function setSelectedtFilmURL(url) {
	Cookies.set(cookie_name, url, { expires: 7 });
}

export function deleteSelectedtFilmURL() {
	Cookies.remove(cookie_name);
}

