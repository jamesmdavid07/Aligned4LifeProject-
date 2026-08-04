import './globals.css';
import type { Metadata } from 'next';
import { Nunito, Raleway, Roboto, Montserrat } from 'next/font/google';
import { CookieConsent } from '@/components/layout/CookieConsent';

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
        url: '/images/shared/logo.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/images/shared/logo.png',
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
      <head>
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var consentMatch = document.cookie.match(/(?:^|; )cookie_consent=([^;]*)/);
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: consentMatch && consentMatch[1] === 'granted' ? 'granted' : 'denied',
  wait_for_update: 1000
});
gtag('js', new Date());
var s = document.createElement('script');
s.async = true;
s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HQQDWX61ZS';
document.head.appendChild(s);
gtag('config', 'G-HQQDWX61ZS');`,
          }}
        />
      </head>
      <body
        className={`${nunito.variable} ${raleway.variable} ${roboto.variable} ${montserrat.variable} font-roboto antialiased`}
      >
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
