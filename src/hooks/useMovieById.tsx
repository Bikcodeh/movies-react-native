import {useState, useEffect} from 'react';
import {Movie} from '../interfaces/movieinterfaces';
import {moviesApi} from '../api/moviesApi';
import {API_KEY, LANG} from '../utils/constants';
import axios, {AxiosError} from 'axios';

export default function useMovieById(movieId: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieById, setMovieById] = useState<Movie | undefined>(undefined);
  const [error, setError] = useState<Error | AxiosError | undefined>(undefined);

  const getMovieById = async (id: number) => {
    try {
      const response = await moviesApi.get<Movie>(
        `/movie/${id}?api_key=${API_KEY}&language=${LANG}`,
      );
      setMovieById(response.data);
    } catch (err) {
      const errorCatch = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        setError(errorCatch);
      } else {
        setError(errorCatch);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieById(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return {
    isLoading,
    error,
    movieById,
  };
}
