import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { cookies } from "next/headers"

const roboto = Roboto({
  variable: "--font-geist-sans",
  weight: "500",
})

export const metadata: Metadata = {
  title: "Portfolio",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = (await cookies()).get("theme")

  return (
    <html lang="en" className={theme?.value === "dark" ? "dark" : ""}>
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  )
}
