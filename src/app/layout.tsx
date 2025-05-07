
import type { Metadata } from 'next'
import './globals.css'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'


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
        <Navbar/>
        <main className="h-full flex flex-col p-10 bg-gray-50 text-gray-900">
          {children}
        </main>
        <footer>
          <Footer/>
      </footer>
      
      </body>
    </html>
  )
}