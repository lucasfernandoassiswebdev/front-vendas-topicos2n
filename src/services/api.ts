import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const apiImdb = axios.create({
    baseURL: 'http://www.omdbapi.com/?t=',
});