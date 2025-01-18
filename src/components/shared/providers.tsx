'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Header } from '.';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Header className="" />
        {children}</SessionProvider>
      <Toaster />
    </>
  );
};
