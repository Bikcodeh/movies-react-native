import {API_HOST, API_KEY, LANG} from '../utils/constants.js';
import axios from 'axios';
import {GenresResponse} from '../interfaces/movieinterfaces';

export const moviesApi = axios.create({
  baseURL: API_HOST,
});

export function getGenresByMovie(genresId: Number[]) {
  return moviesApi
    .get<GenresResponse>(
      `/genre/movie/list?api_key=${API_KEY}&language=${LANG}`,
    )
    .then(response => {
      const genres: string[] = [];
      genresId.forEach(item => {
        response.data.genres.forEach(genre => {
          if (item === genre.id) {
            genres.push(genre.name);
          }
        });
      });
      return genres;
    });
}