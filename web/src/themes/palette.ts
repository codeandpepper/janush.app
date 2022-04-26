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
});

export const getPalette = (darkMode: boolean): Palette =>
  darkMode ? darkPalette : lightPalette;
