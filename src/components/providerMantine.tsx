import { CacheProvider } from "@emotion/react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useEmotionCache
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import {
  createDataModel,
  createInformasi,
  createModalSuccess,
} from "./modals";

const modals = {
  createData: createDataModel,
  createInformasi,
  modalSuccess: createModalSuccess,
};
declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export default function ProviderMantine({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <CacheProvider value={cache}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              "brand-smp": [
                "#ede9fc", // 0
                "#ccc1f6", // 1
                "#aa99f0", // 2
                "#8971ea", // 3
                "#6849e4", // 4
                "#4721de", // 5
                "#381ab2", // 6
                "#2b1485", // 7
                "#1c0d59", // 8
                "#0e072c", // 9
              ],
              "brand-smk": [
                "#fcf2e9", // 0
                "#f6dac1", // 1
                "#f0c299", // 2
                "#eaa971", // 3
                "#e49149", // 4
                "#de7921", // 5
                "#b2611a", // 6
                "#b2481a", // 7
                "#59300d", // 8
                "#2c1807", // 9
              ]
            },
            primaryColor: "brand-smp",
            primaryShade: { dark: 4, light: 7 },
            fontFamily: "Poppins, sans-serif",
            headings: {
              fontFamily: "Poppins, sans-serif",
            },
            defaultGradient: {
              deg: 120,
              from: "#aa99f0",
              to: "#381ab2"
            },
            components: {
              DateTimePicker: {
                styles: {
                  calendar: {
                    maxWidth: "500px"
                  },
                  calendarHeader: {
                    marginInline: "auto"
                  }
                },
              },
              Button: {
                variants: {
                  danger: (theme) => ({
                    root: {
                      backgroundColor: theme.colors.red[6],
                      color: theme.colors.red[0],
                      ...theme.fn.hover({
                        backgroundColor: theme.colors.red[8],
                      }),
                    },
                  }),

                  success: (theme) => ({
                    root: {
                      backgroundColor: "#2A166F",
                      color: theme.white,
                    },
                  }),
                },
              },
            },
          }}
        >
          <ModalsProvider
            modals={modals}
            modalProps={{
              centered: true,
              size: "lg",
              closeOnEscape: false
            }}
          >
            {children}
          </ModalsProvider>
        </MantineProvider>
      </CacheProvider>
    </ColorSchemeProvider>
  );
}