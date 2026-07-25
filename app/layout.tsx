
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
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
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
