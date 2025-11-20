import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cinematic Storyboard - Rain City',
  description: 'Interactive cinematic storyboard experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
