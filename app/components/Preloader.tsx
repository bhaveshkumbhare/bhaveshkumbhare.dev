"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const words = ["Hello", "Bonjour", "Ciao", "Olá", "Hola", "Hei"]

const easing: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function Preloader() {

  const [index, setIndex] = useState(0)

useEffect(() => {
  let i = 0
  const interval = setInterval(() => {
    i++
    if (i < words.length) {
      setIndex(i)
    } else {
      clearInterval(interval)
    }
  }, 600)

  return () => clearInterval(interval)
}, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white text-gray-500 flex items-center justify-center "
       style={{ fontFamily: "'Poppins', sans-serif" }}
      initial={{ y: 0 }}
      
      exit={{
        y: "-100%",
        transition: {
          duration: 1.2,
          ease: easing
        }
      }}
    >

      {/* TEXT */}
     <motion.h1
      key={words[index]}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: easing }}
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="absolute text-6xl font-semibold tracking-tight"
    >
      {words[index]}
    </motion.h1>

      {/* CURVE */}
      <div className="absolute bottom-0 w-full h-0 ">
       <svg
  className="absolute bottom-0 left-0 w-full h-75"
  viewBox="0 0 1440 300"
  preserveAspectRatio="none"
>
  <motion.path
    initial={{ d: "M0 150 Q720 150 1440 150 L1440 300 L0 300 Z" }}
    animate={{ d: "M0 150 Q720 220 1440 150 L1440 300 L0 300 Z" }}
    exit={{
      d: "M0 150 Q720 -300 1440 150 L1440 300 L0 300 Z"
    }}
    transition={{
      duration: 5,
      ease: easing
    }}
    fill="black"
  />
</svg>
      </div>

    </motion.div>
  )
}
