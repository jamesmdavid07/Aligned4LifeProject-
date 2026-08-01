import './globals.css';
import type { Metadata } from 'next';
import { Nunito, Raleway, Roboto, Montserrat } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '700', '800'],
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aligned4LifeProject | Anchored in Alignment',
  description:
    'Helping individuals realign their lives with God\'s purpose through truth, healing, and transformation.',
  openGraph: {
    title: 'Aligned4LifeProject | Anchored in Alignment',
    description:
      'Helping individuals realign their lives with God\'s purpose through truth, healing, and transformation.',
    images: [
      {
        url: '/images/logo.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/images/logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${raleway.variable} ${roboto.variable} ${montserrat.variable} font-roboto antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
