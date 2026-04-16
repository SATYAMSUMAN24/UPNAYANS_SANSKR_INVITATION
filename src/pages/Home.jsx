import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import BookLayout from '../components/Invitation/BookLayout';

/* Full‑screen no‑scroll host — overflow + sizing handled by global.css */
const Home = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BookLayout />
  </ThemeProvider>
);

export default Home;
