import {API_HOST} from '../utils/constants.js';
import axios from 'axios';

export const moviesApi = axios.create({
    baseURL: API_HOST
});