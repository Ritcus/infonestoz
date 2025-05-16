import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: {
    default: 'InfoNestOz Blog',
    template: '%s | InfoNestOz'
  },
  description: 'The best blog about anything from personal blog, news, bargain, free, money,',
  keywords: ['blog', 'technology', 'bargain','free', 'money'],
  manifest: "/manifest.json",
  openGraph: {
    type: 'website',
    locale: 'en_AUS',
    url: 'https://infonestoz.vercel.app/',
    siteName: 'InfoNestOz',
    images: [
      {
        url: 'https://infonestoz.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InfoNestOz',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Info Nest",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000", // Moved here
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/window.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>

      <body>
        <Navbar />
        <main className="h-full flex flex-col p-5 bg-gray-50 text-gray-900">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
