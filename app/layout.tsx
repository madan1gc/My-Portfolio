import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import './globals.css';

// Loaded for a single deliberate editorial moment (the Blog section's
// italic-serif heading) — see Section's `titleClassName` prop.
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['600'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://madangc.example'),
  title: 'Madan G.C — Frontend Developer & WordPress Product Builder',
  description:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
      </head>
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
