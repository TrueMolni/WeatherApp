import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = '20592fef14d0a4fbdbe2137d29f25cb0'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      timestamp: Date.now(),
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }
};