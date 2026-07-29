import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

// White Bot SVG encoded for browser tab favicons
const botSvgUri = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>'
)}`

export const metadata: Metadata = {
  metadataBase: new URL('https://aadhithcj.vercel.app'),
  title: 'Aadhith C J — Software Developer & Full Stack Engineer',
  description:
    'Portfolio of Aadhith C J, a Computer Science Engineering graduate building web, desktop, Android and AI-powered applications with React, Python, Kotlin and computer vision.',
  keywords: [
    'Aadhith C J',
    'Software Developer',
    'Full Stack Engineer',
    'React',
    'Python',
    'Kotlin',
    'Computer Vision',
    'Machine Learning',
  ],
  openGraph: {
    title: 'Aadhith C J — Software Developer & Full Stack Engineer',
    description:
      'Web, desktop, Android and AI-powered applications built from concept to deployment.',
    url: 'https://aadhithcj.vercel.app',
    siteName: 'Aadhith C J Portfolio',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 512,
        height: 512,
        alt: 'Aadhith C J',
      },
    ],
  },
  twitter: {
    card: 'summary', // Ensures small thumbnail side-by-side layout
    title: 'Aadhith C J — Software Developer & Full Stack Engineer',
    description:
      'Web, desktop, Android and AI-powered applications built from concept to deployment.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: botSvgUri,
        type: 'image/svg+xml',
      },
    ],
    apple: botSvgUri,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f0dd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
