"use client"


import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Preloader from "./components/Preloader"

import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Projects } from "./components/Projects"
import { About } from "./components/About"
import { ContactUs } from "./components/ContactUs"
import { Skills } from "./components/Skills"


export default function Home() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 3000) // 6 words × 400ms + buffer
  return () => clearTimeout(timer)
}, [])

  return (
    <main className="relative">

      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About/>
      <ContactUs/>


    </main>
  )
}