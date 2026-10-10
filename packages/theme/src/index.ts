import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      brand: string;
    };
  }
  interface ThemeOptions {
    customColors?: {
      brand?: string;
    };
  }
}
export const myOrgTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  customColors: {
    brand: '#ff5722',
  },
});
