export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  timestamp: number;
}

export interface WeatherError {
  message: string;
}

export interface CachedWeather extends WeatherData {
  cachedAt: number;
}