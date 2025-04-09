import { WeatherData, CachedWeather } from '../types/weather';

const CACHE_DURATION = 5 * 60 * 1000; 

export const getCachedWeather = (city: string): WeatherData | null => {
  const cached = localStorage.getItem(`weather_${city.toLowerCase()}`);
  if (!cached) return null;

  const data: CachedWeather = JSON.parse(cached);
  if (Date.now() - data.cachedAt > CACHE_DURATION) {
    localStorage.removeItem(`weather_${city.toLowerCase()}`);
    return null;
  }

  return data;
};

export const cacheWeather = (data: WeatherData): void => {
  const cacheData: CachedWeather = {
    ...data,
    cachedAt: Date.now(),
  };
  localStorage.setItem(`weather_${data.city.toLowerCase()}`, JSON.stringify(cacheData));
};