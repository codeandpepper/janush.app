import { createTheme, Theme, ThemeOptions } from "@mui/material";

export const createDefaultTheme = (options?: ThemeOptions): Theme =>
  createTheme({ ...options });
