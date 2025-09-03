export const metadata = { title: "eShaman – Clarity in your pocket", description: "Oracle chat, rituals, and daily insight." }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
