"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const text = "Available for work · React · Next.js · TypeScript · Node.js · Framer Motion · "

export function Marquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={ref} style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 0" }}>
      <motion.div style={{ x, display: "flex", whiteSpace: "nowrap" }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{ color: "rgba(245,245,240,0.3)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}