import axios from 'axios';

const BASE_URL = 'http://api.tvmaze.com';

export const fetchSchedule = async () => {
    const response = await axios.get(`${BASE_URL}/schedule?country=US`);
    return response.data;
};

export const fetchShowDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/shows/${id}`);
    return response.data;
};
