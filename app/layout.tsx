import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://madangc.example'),
  title: 'Madan G.C — Frontend Developer & WordPress Product Builder',
  description:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
