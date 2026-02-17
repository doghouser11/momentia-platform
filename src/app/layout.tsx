export const metadata = {
  title: 'Momentia Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body style={{margin: 0, fontFamily: 'Arial, sans-serif'}}>
        {children}
      </body>
    </html>
  )
}