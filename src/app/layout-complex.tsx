import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Momentia - Спокойствие за вашите събития',
  description: 'Забравете за стреса при организиране на събития. Ние се грижим за поканите, вие се фокусирайте върху важното - гостите, масите и празника.',
  keywords: 'покани за сватба, организация събития, RSVP управление, покани за рожден ден, покани кръщене, България',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
}