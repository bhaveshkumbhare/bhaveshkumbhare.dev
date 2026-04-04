import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";
import { SmoothScroll } from "./components/SmoothScroll"
import { Cursor } from "./components/Cursor"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title:"Bhavesh Kumbhare — Design + Dev Student",
  description:  "Final year student from Surat building beautiful, fast web experiences with React and Next.js.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body style={{ fontFamily: "var(--font-poppins), sans-serif" }} className={poppins.variable}>
         <SmoothScroll>
          <Cursor/>
            {children}
          </SmoothScroll>
      </body>
    </html>
  )
}