import { useState } from "react";
import { Container, Title, Alert, Box, Space, Center } from "@mantine/core";
import { AlertTriangle } from "lucide-react";

import { SearchForm } from "./components/SearchForm";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { DarkTheme } from "./components/DarkTheme";

import { getWeatherData } from "./utils/api";
import { getCachedWeather, cacheWeather } from "./utils/cache";

import { WeatherData } from "./types/weather";

import css from "./App.module.css";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const cachedData = getCachedWeather(city);
      if (cachedData) {
        setWeather(cachedData);
        setIsLoading(false);
        return;
      }

      const data = await getWeatherData(city);
      setWeather(data);
      cacheWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Center>
        <Title order={1} mb="lg">
          Weather App
        </Title>
      </Center>
      <DarkTheme />
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      {error && (
        <>
          <Space h="md" />
          <Alert
            icon={<AlertTriangle size={40} className={css.alertIcon} />}
            title="Error"
            color="red"
            radius="md"
            withCloseButton={false}
          >
            {error}
          </Alert>
        </>
      )}
      {weather && !error && (
        <>
          <Space h="xl" />
          <Box>
            <WeatherDisplay weather={weather} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default App;
