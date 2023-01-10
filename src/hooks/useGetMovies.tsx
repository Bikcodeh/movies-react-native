import {useEffect, useState} from 'react';
import {moviesApi} from '../api/moviesApi';
import {Movie, MovieResponse} from '../interfaces/movieinterfaces';
import axios, {AxiosError} from 'axios';

export default function useGetMovies(endpoint: string) {
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | AxiosError | undefined>(undefined);

  const getMovies = async () => {
    try {
      setIsLoadingMovies(true);
      const response = await moviesApi.get<MovieResponse>(
        `/movie/${endpoint}?page=${page}`,
      );
      handleMoviesResponse(response.data);
    } catch (err) {
      const errorHandled = err as Error | AxiosError;
      if (!axios.isAxiosError(errorHandled)) {
        setError(errorHandled);
      } else {
        setError(errorHandled);
      }
      setIsLoadingMovies(false);
    }
  };

  const nextPage = () => {
    if (canLoadMore) {
      setPage(page + 1);
    }
  };

  const handleMoviesResponse = (movieResponse: MovieResponse) => {
    const {results, total_pages} = movieResponse;
    setIsLoadingMovies(false);
    setCanLoadMore(page <= total_pages);
    if (movies.length === 0) {
      setMovies(results);
    } else {
      setMovies([...movies, ...results]);
    }
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, page]);

  return {
    isLoadingMovies,
    canLoadMore,
    movies,
    getMovies,
    error,
    nextPage,
  };
}
