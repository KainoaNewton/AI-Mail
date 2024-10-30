'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Settings from './components/Settings';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Settings />
      </body>
    </html>
  );
}
