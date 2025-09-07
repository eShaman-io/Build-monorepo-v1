'use client';

import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from '@esh/ui'; // Assuming AuthProvider is in your UI package

export const metadata = { title: "eShaman – Clarity in your pocket", description: "Oracle chat, rituals, and daily insight." }
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
