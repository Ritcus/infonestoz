import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My PWA',
  description: 'A Progressive Web App',
  manifest: '/manifest.json', // PWA manifest
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
  appleWebApp: {
    capable: true,
    title: 'My PWA',
    statusBarStyle: 'default',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}