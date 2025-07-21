import { createTheme } from '@mui/material/styles';

export const themes = {
  light: createTheme({ palette: { mode: 'light', primary: { main: '#1976d2' } } }),
  dark: createTheme({ palette: { mode: 'dark', primary: { main: '#90caf9' } } }),
  navy: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#0d47a1' },
      background: { default: '#0b1e3f', paper: '#102c5c' },
      text: { primary: '#e3f2fd', secondary: '#90caf9' },
    },
  }),
  // сюда можно добавить ещё тем
};