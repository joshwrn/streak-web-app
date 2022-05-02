import axios from 'axios';

const API_URL = 'http://localhost:4000/api/streaks/';

const configDefault = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

// create a new streak
const createStreak = async (streakData, token) => {
  console.log('createStreak');
  const response = await axios.post(API_URL, streakData, configDefault(token));

  return response.data;
};

// get user streaks
const getStreaks = async (token) => {
  console.log('getStreaks');
  const response = await axios.get(API_URL, configDefault(token));

  return response.data;
};

const streakService = {
  createStreak,
  getStreaks,
};

export default streakService;
