import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Interest Discovery - Ascend Now',
  description: 'Discover your interests and explore career pathways',
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
