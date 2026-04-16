import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E6B325',
      light: '#F5D06A',
      dark: '#C58940',
      contrastText: '#3D1A00',
    },
    secondary: {
      main: '#8B0000',
      light: '#B22222',
      dark: '#5C0000',
      contrastText: '#FFF8E7',
    },
    background: {
      default: '#FFF8E7',
      paper: '#FFFDF5',
    },
    text: {
      primary: '#3D1A00',
      secondary: '#6B3A2A',
    },
    success: {
      main: '#3A7D44',
    },
    custom: {
      gold: '#C58940',
      haldi: '#E6B325',
      red: '#8B0000',
      green: '#3A7D44',
      cream: '#FFF8E7',
      darkBrown: '#3D1A00',
    },
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", "Roboto", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 900,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: '1.05rem',
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 253, 245, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(230, 179, 37, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#3D1A00',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(230, 179, 37, 0.4)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600,
          fontSize: '0.9rem',
        },
      },
    },
  },
});

export default theme;
