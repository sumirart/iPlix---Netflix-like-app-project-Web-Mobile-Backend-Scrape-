import axios from 'axios';

export const getcategory = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get('http://68.183.117.9:5000/categories')
    }
}
export const getmovie = () => {
    return {
        type: 'GET_RELATED',
        payload: axios.get('http://68.183.117.9:5000/movie/:id/related')
    }
}

export const getseries = () => {
    return {
        type: 'GET_SERIES',
        payload: axios.get('http://68.183.117.9:5000/movie/:id/series')
    }
}

export const getpopular = () => {
    return {
        type: 'GET_POPULAR',
        payload: axios.get('http://68.183.117.9:5000/movies/popular')
    }
}

export const gettrending = () => {
    return {
        type: 'GET_TRENDING',
        payload: axios.get('http://68.183.117.9:5000/movies/trending')
    }
}

export const getmovies = () => {
    return {
        type: 'GET_MOVIES',
        payload: axios.get('http://192.168.0.62:3333/movies')
    }
}

export const getlogin = () => {
    return {
        type: 'GET_LOGIN',
        payload: axios.get('http://68.183.117.9:5000/login')
    }
}

export const getregister = () => {
    return {
        type: 'GET_REGISTER',
        payload: axios.get('http://68.183.117.9:5000/register')
    }
}

export const getcached = () => {
    return {
        type: 'GET_CACHED',
        payload: axios.get('http://68.183.117.9:5000/cached')
    }
}