'use client';

import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from './components/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
