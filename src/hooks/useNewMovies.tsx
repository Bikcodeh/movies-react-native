import React, { useEffect, useState } from 'react';
import { moviesApi } from '../api/moviesApi';
import { MovieResponse, Movie } from '../interfaces/movieinterfaces';
import { API_KEY, LANG } from '../utils/constants';


export default function useNewMovies() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newMovies, setNewMovies] = useState<Movie[]>([] as Movie[]);
    const [hasError, setHasError] = useState<boolean>(false);

    const loadMovies = async () => {
        setIsLoading(true);
        try {
            const response = await moviesApi.get<MovieResponse>(`/now_playing?api_key=${API_KEY}&language=${LANG}`);
            setNewMovies(response.data.results);
            setHasError(false);
        } catch (error) {
            setHasError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    return {
        isLoading,
        newMovies,
        hasError
    };
}
