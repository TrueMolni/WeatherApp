import { useState } from "react";
import { TextInput, Button, Group, Box, useMantineTheme } from "@mantine/core";
import { Search } from "lucide-react";

import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const [city, setCity] = useState("");

  const theme = useMantineTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Group gap="sm" align="stretch" className={styles.inputGroup}>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          classNames={{ input: styles.input }}
          className={styles.textInput}
        />
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          leftSection={<Search size={18} color={theme.colors.blue[0]} />}
          className={styles.button}
          color={theme.colors.blue[5]}
          bg={theme.colors.blue[7]}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Group>
    </Box>
  );
};
