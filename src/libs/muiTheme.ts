import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'M PLUS 2', sans-serif",
        },
      },
    },
  },
});
