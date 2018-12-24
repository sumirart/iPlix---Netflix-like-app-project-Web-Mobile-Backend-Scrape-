import axios from 'axios';

const IP = process.env.REACT_APP_REST_IP + "/movies/cached?page=";

export const fetchAll = (page) => ({
    type : 'FETCH_ALL',
    payload : axios.get(IP + page)
});