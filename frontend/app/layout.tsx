import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Billinator - GST Billing & Inventory Management | Free Until 2027',
  description: 'Multi-tenant GST billing and inventory management system. Free to use until 2027. Developed by Medhā Labs.',
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

