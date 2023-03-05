import '../features/auth/auth.config';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthMiddleware from '@/components/AuthMiddleware/AuthMiddleware';
import { muiTheme } from '@/libs/muiTheme';
import { ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <RecoilRoot>
        <AuthMiddleware>
          <Component {...pageProps} />
        </AuthMiddleware>
      </RecoilRoot>
    </ThemeProvider>
  );
}
