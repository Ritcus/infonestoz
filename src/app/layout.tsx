
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './navbar/page'


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
        <Navbar />
        <main className="h-full flex flex-col p-10 bg-gray-50 text-gray-900">
          {children}
        </main>
        <footer className="py-6 bg-red mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          © 2025 RM Consulting. All rights reserved.
        </div>
      </footer>
      </body>
    </html>
  )
}