import { CacheProvider } from "@emotion/react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useEmotionCache,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import {
  createDataModel,
  createInformasi,
  createModalSuccess,
  modalAlurAdmin,
} from "./modals";

const modals = {
  createData: createDataModel,
  createInformasi,
  modalSuccess: createModalSuccess,
  modalAlurAdmin,
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
              "brand-blue": [
                "#e4f2ff",
                "#bad6f8",
                "#90bbef",
                "#66a0e7",
                "#3c85de",
                "#256bc6",
                "#1a539a",
                "#103c6f", // main color
                "#052445",
                "#000d1c",
              ],
              "brand-sky-blue": [
                "#e2f4ff",
                "#bcdcf6",
                "#93c3ea",
                "#6babe0", // main color
                "#4493d7",
                "#2b79bd",
                "#1f5e94",
                "#13436b",
                "#052842",
                "#000e1b",
              ],
              "brand-yellow": [
                "#fff7db",
                "#ffe7af",
                "#fcd681",
                "#f9c650",
                "#f8b621", // main color
                "#de9c07",
                "#ad7a02",
                "#7c5700",
                "#4b3400",
                "#1d1000",
              ],
              // "brand-blues": ["#2A166F"],
            },
            // primaryColor: "brand-blues",
            // primaryShade:4,
            fontFamily: "Poppins, sans-serif",
            headings: {
              fontFamily: "Poppins, sans-serif",
            },
            components: {
              Button: {
                defaultProps: {
                  color: "brand-blue",
                },
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
            }}
          >
            {children}
          </ModalsProvider>
        </MantineProvider>
      </CacheProvider>
    </ColorSchemeProvider>
  );
}
