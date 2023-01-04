import axios from 'axios';
import {API_HOST, API_KEY, LANG} from '../utils/constants.js';
import {
  GenresResponse,
  Genre,
  Movie,
  MovieResponse,
} from '../interfaces/movieinterfaces';

export const moviesApi = axios.create({
  baseURL: API_HOST,
});

export function getGenresByMovie(genresId: Number[]): Promise<string[]> {
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

export function getGenres(): Promise<Genre[]> {
  return moviesApi
    .get<GenresResponse>(
      `/genre/movie/list?api_key=${API_KEY}&language=${LANG}`,
    )
    .then(response => response.data.genres);
}

export function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  return moviesApi
    .get<MovieResponse>(
      `/discover/movie?api_key=${API_KEY}&language=${LANG}&with_genres=${genreId}`,
    )
    .then(response => response.data.results);
}
