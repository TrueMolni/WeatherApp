import { describe, it, expect, beforeEach } from "vitest";
import "mock-local-storage";

import { getCachedWeather, cacheWeather } from "../utils/cache";

import { WeatherData } from "../types/weather";

describe("Weather Cache Utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockWeatherData: WeatherData = {
    city: "London",
    temperature: 20,
    description: "clear sky",
    icon: "01d",
    timestamp: Date.now(),
  };

  it("should cache weather data", () => {
    cacheWeather(mockWeatherData);
    const cached = localStorage.getItem(
      `weather_${mockWeatherData.city.toLowerCase()}`
    );
    expect(cached).not.toBeNull();
  });

  it("should retrieve cached weather data", () => {
    cacheWeather(mockWeatherData);
    const data = getCachedWeather("London");
    expect(data).toMatchObject(mockWeatherData);
  });

  it("should return null for non-existent cache", () => {
    const data = getCachedWeather("NonExistentCity");
    expect(data).toBeNull();
  });

  it("should return null for expired cache", () => {
    const oldData = {
      ...mockWeatherData,
      cachedAt: Date.now() - 6 * 60 * 1000, // 6 minutes ago
    };
    localStorage.setItem("weather_london", JSON.stringify(oldData));
    const data = getCachedWeather("London");
    expect(data).toBeNull();
  });
});
