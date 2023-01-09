import axios, {AxiosRequestConfig} from 'axios';
import {API_HOST, API_KEY, LANG} from '../utils/constants.js';
import {
  GenresResponse,
  Genre,
  Movie,
  MovieResponse,
  VideoResponse,
  Video,
} from '../interfaces/movieinterfaces';

export const moviesApi = axios.create({
  baseURL: API_HOST,
});

moviesApi.interceptors.request.use(
  function (res: AxiosRequestConfig<any>) {
    res.params = {...res.params, api_key: API_KEY, language: LANG};
    return res;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

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
    .get<GenresResponse>('/genre/movie/list')
    .then(response => response.data.genres);
}

export function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  return moviesApi
    .get<MovieResponse>(`/discover/movie?&with_genres=${genreId}`)
    .then(response => response.data.results);
}

export function getVideosByMovieId(movieId: number): Promise<Video[]> {
  return moviesApi
    .get<VideoResponse>(`/movie/${movieId}/videos`)
    .then(response => response.data.results);
}

export function getMovieById(movieId: number): Promise<Movie> {
  return moviesApi
    .get<Movie>(`/movie/${movieId}`)
    .then(response => response.data);
}

export function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  return moviesApi
    .get<MovieResponse>(`/movie/popular?page=${page}`)
    .then(response => response.data);
}

export function getNewMovies(page: number = 1): Promise<MovieResponse> {
  return moviesApi
    .get<MovieResponse>(`/movie/latest?page=${page}`)
    .then(response => response.data);
}
