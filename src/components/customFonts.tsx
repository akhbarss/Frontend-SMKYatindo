import { Global } from "@mantine/core";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Open Sans",
            src: `url('/fonts/OpenSans/OpenSans-Regular.woff2') format("woff2")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Open Sans",
            src: `url('/fonts/OpenSans/OpenSans-SemiBold.woff2') format("woff2")`,
            fontWeight: 600,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Open Sans",
            src: `url('/fonts/OpenSans/OpenSans-Bold.woff2') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Open Sans",
            src: `url('/fonts/OpenSans/OpenSans-ExtraBold.woff2') format("woff2")`,
            fontWeight: 800,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "MyriadPro",
            src: `url('/fonts/MyriadPro/MyriadPro-Light.woff') format("woff")`,
            fontWeight: 300,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "MyriadPro",
            src: `url('/fonts/MyriadPro/MyriadPro-Regular.woff') format("woff")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "MyriadPro",
            src: `url('/fonts/MyriadPro/MyriadPro-SemiBold.woff') format("woff")`,
            fontWeight: 600,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Ubuntu",
            src: `url('/fonts/Ubuntu/UbuntuLight.ttf') format("ttf")`,
            fontWeight: 300,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Ubuntu",
            src: `url('/fonts/Ubuntu/UbuntuMedium.ttf') format("ttf")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Ubuntu",
            src: `url('/fonts/Ubuntu/UbuntuBold.ttf') format("ttf")`,
            fontWeight: 600,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
