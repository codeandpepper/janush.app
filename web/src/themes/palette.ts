import createPalette, { Palette } from "@mui/material/styles/createPalette";

const lightPalette = createPalette({
  primary: {
    main: "#3F51B5",
    light: "#B6BDE3",
  },
  secondary: {
    main: "#F7F7F7",
    dark: "#666666",
  },
  error: {
    main: "#B00020",
  },
});

const darkPalette = createPalette({
  primary: {
    main: "#3F51B5",
    light: "#B6BDE3",
  },
  secondary: {
    main: "#F7F7F7",
    dark: "#666666",
  },
  error: {
    main: "#B00020",
  },
});

export const getPalette = (darkMode: boolean): Palette =>
  darkMode ? darkPalette : lightPalette;

export const rgbaColors = {
  grey: {
    lightest: "rgba(0, 0, 0, 0.05)",
    lighter: "rgba(0, 0, 0, 0.12)",
    light: "rgba(0, 0, 0, 0.15)",
    main: "rgba(0, 0, 0, 0.38)",
    dark: "rgba(0, 0, 0, 0.6)",
    darkest: "rgba(63, 81, 181, 0.05)",
  },
};
