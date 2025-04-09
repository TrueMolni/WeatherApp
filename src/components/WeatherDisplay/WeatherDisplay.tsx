import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, Image, Text, Group, Title, Stack, Badge } from "@mantine/core";

import { WeatherData } from "../../types/weather";

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={2}>{weather.city}</Title>
        <Image
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          width={128}
          height={128}
          fit="contain"
          radius="md"
        />
      </Group>

      <Stack gap="xs">
        <Text fz={48} fw={700} c="blue.6">
          {weather.temperature}°C
        </Text>
        <Badge color="blue" variant="light" size="lg" radius="sm">
          {weather.description}
        </Badge>
        <Text size="sm" c="dimmed">
          Updated {formatDistanceToNow(weather.timestamp)} ago
        </Text>
      </Stack>
    </Card>
  );
};
