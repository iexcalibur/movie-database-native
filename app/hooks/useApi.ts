// Typescript custom enum for search types (optional)
export enum SearchType {
	all = '',
	movie = 'movie',
	series = 'series',
	episode = 'episode'
}

export interface Result {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface DetailsResult {
	Genre: string;
	Title: string;
	Year: string;
	Poster: string;
	Plot: string;
	imdbRating: string;
	Director: string;
	Actors: string;
	Website: string;
	Awards: string;
}

import list from './dummy.json';
import details from './details.json';

export const useApi = () => {
	let url = 'https://www.omdbapi.com/';
	let apiKey = 'fa3afcbc';

	const searchData = async (
		title: string,
		type: SearchType
	): Promise<{ Search: Result[]; Error?: string }> => {
		const result = await fetch(`${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`);
		return result.json();
		// return new Promise((resolve, reject) => {
		//   setTimeout(() => {
		//     resolve({ Search: list });
		//   }, 1000);
		// });
	};

	const getDetails = async (id: string): Promise<DetailsResult> => {
		const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
		return result.json();
		// return new Promise((resolve, reject) => {
		//   setTimeout(() => {
		//     resolve(details);
		//   }, 3000);
		// });
	};

	return {
		searchData,
		getDetails
	};
};

export default useApi;