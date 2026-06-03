import React from 'react';
import './globals.css';
import { Providers } from './Providers';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

export const metadata = {
  title: 'PrintsCarts - Quality Printing Solutions',
  description: 'Your one-stop shop for printers, ink, and toner.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Logo is rendered by a client component; preload removed to avoid unused-preload warning */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
