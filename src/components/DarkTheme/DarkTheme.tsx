import { useState } from "react";
import cx from "clsx";
import {
  Group,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Moon, SunMedium } from "lucide-react";

import css from "./dark-theme.module.css";

export const DarkTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center" mb={"xl"}>
      <ActionIcon
        onClick={() => {
          setIsDarkMode(!isDarkMode);
          setColorScheme(computedColorScheme === "light" ? "dark" : "light");
        }}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <SunMedium
          fill="black"
          className={(cx(css.sunIcon), !isDarkMode ? css.light : css.dark)}
        />
        <Moon
          fill="white"
          className={cx(css.icon, isDarkMode ? css.light : css.dark)}
        />
      </ActionIcon>
    </Group>
  );
};
