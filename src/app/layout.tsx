import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ABA Scheduler",
  description: "AI-powered ABA scheduling tool",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`text-base ${inter.className}`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
