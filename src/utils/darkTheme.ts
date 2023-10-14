import { useMantineTheme } from "@mantine/core";

export function DarkTheme() {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  return dark;
}
