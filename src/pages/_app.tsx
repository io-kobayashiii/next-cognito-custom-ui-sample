import '../features/auth/auth.config';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthMiddleware from '@/components/AuthMiddleware/AuthMiddleware';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthMiddleware>
        <Component {...pageProps} />;
      </AuthMiddleware>
    </RecoilRoot>
  );
}
