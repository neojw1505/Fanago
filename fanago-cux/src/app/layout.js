import { Montserrat as FontSans } from "next/font/google"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/Toaster/toaster"
import Navbar from "@/components/Navbar"

import { cn } from "../lib/utils"
import AuthContext from "./auth"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Fanago",
  description: "Your one stop ticketing platform",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        "antialiase dark min-h-screen bg-background text-foreground"
      )}
    >
      <body>
        <AuthContext>
          <Navbar />
          {children}
          <Toaster />
        </AuthContext>
      </body>
    </html>
  )
}
