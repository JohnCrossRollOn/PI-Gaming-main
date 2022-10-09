const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;

const rawg = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: KEY,
        page_size: 100
    }
})
module.exports = rawg